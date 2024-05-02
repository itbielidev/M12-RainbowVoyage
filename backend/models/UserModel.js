import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from 'fs';
import fsa from 'fs/promises';
import sharp from 'sharp';
import "dotenv/config";

const prismadb = new PrismaClient();

export class UserModel {

    static async register(user_data) {

        try {

            let returnState = 1;

            //Check if the user email is already registered in the database.
            const user = await prismadb.user.findFirst({
                where: {
                    email: user_data.email
                }
            });

            if (user !== null) {
                console.log("User email already exists!");
                returnState = -2;
                return [returnState, null];
            };

            //If the user does not exist in the database we proceed to insert the request data

            //Password encryption with salt
            const salt = await bcrypt.genSalt(2);

            const hashedPassword = await bcrypt.hash(user_data.password, salt);

            //admin@gmail.com | admin2024

            const userType = user_data.email === "admin@gmail.com" ? 'admin' : 'client';

            //Inserting user in DB.
            const newUser = await prismadb.user.create({
                data: {
                    email: user_data.email,
                    password_hash: hashedPassword,
                    salt_hash: salt,
                    name: user_data.name,
                    last_name: user_data.lastName,
                    phone: user_data.phone,
                    type: userType,
                }
            });

            //If the user has specified a preference value we need to create a new preference object
            if ([user_data.num_people_min, user_data.num_people_max, user_data.duration_min, user_data.duration_max, user_data.experience_type].some(value => value !== null)) {
                const newUserPreferences = await prismadb.userPreference.create({
                    data: {
                        price_min: null,
                        price_max: null,
                        type: user_data.experience_type,
                        num_people_max: user_data.num_people_max,
                        num_people_min: user_data.num_people_min,
                        duration_min: user_data.duration_min,
                        duration_max: user_data.duration_max
                    }
                });

                //Attach the new preferences settings to the user
                await prismadb.user.update({
                    where: {
                        id: newUser.id
                    },
                    data: {
                        preference_id: newUserPreferences.id
                    }
                })
            }

            //We sign the JWT token to send it to the client.
            let token_generated = jwt.sign({ user_id: newUser.id, user_email: newUser.email, user_role: userType },
                process.env.TOKEN_SECRET, { expiresIn: '1h' });

            return [returnState, token_generated];

        } catch (error) {
            console.log(error);
        }
    }

    static async login(user_data) {
        try {

            let returnState = 1;

            //Check if the user email exists in the database.
            const user = await prismadb.user.findFirst({
                where: {
                    email: user_data.email
                }
            })

            //If the user does not exist in the database we return an error.
            if (user === null) {
                console.log("User does not exist!");
                returnState = -2;
                return [returnState, null];
            }

            //If the user is not active we return an error.
            if (!user.status) {
                console.log("User is not activated in the system!");
                returnState = -1;
                return [returnState, null];
            }


            //Check if the received password is equal to the one stored in the database for this user
            const passwordValidation = await bcrypt.compare(user_data.password, user.password_hash);

            if (!passwordValidation) {
                console.log("passwords do not match!");
                returnState = -3;
                return [returnState, null];
            }


            //We sign the JWT token to send it to the client.
            let token_generated = jwt.sign({ user_id: user.id, user_email: user.email, user_role: "client" },
                process.env.TOKEN_SECRET, { expiresIn: '1h' });

            return [returnState, token_generated];

        } catch (error) {
            console.log(error);
        }

    }

    static async getUser(userId) {
        try {

            const user = await prismadb.user.findFirst({
                where: {
                    id: userId
                },
                include: {
                    preference: true
                }
            })

            return [1, user];

        } catch (error) {
            console.log(error);
        }
    }

    static async updatePreferences(userId, preferencesData) {

        try {

            //Getting the preferences of the authnticated user
            const user = await prismadb.user.findFirst({
                where: {
                    id: userId
                },
                include: {
                    preference: true
                }
            })

            let preference = user.preference;

            //We create a new preference object if it does not exist.
            if (!preference) {
                preference = await prismadb.userPreference.create({
                    data: {
                        ...preferencesData
                    }
                })

                //We update the preference id of the aunthenticated user.
                await prismadb.user.update({
                    where: {
                        id: userId
                    },
                    data: {
                        preference_id: preference.id
                    }

                })
            }

            console.log(preference);

            const updatedPreference = { ...preference, ...preferencesData };

            // Store updated preferences in database 
            await prismadb.userPreference.update({
                where: {
                    id: preference.id
                },
                data: updatedPreference
            });


            return [1, updatedPreference];
        } catch (error) {
            console.log(error);
        }

    }

    static async updateData(data, userId) {

        try {
            await prismadb.user.update({
                where: {
                    id: userId
                },
                data: {
                    name: data.name,
                    last_name: data.last_name,
                    phone: data.phone
                }
            });

            return 1

        } catch (error) {
            console.log(error)
        }

    }

    static async updateEmail(data, userId) {

        try {

            let returnState = 1;

            //Check if the user email is already registered in the database.
            const user = await prismadb.user.findFirst({
                where: {
                    email: data.email
                }
            });

            if (user !== null) {
                //console.log("User email already exists!");
                returnState = -2;
                return returnState;
            };

            //Otherwise we proceed to update the email.
            await prismadb.user.update({
                where: {
                    id: userId
                },
                data: {
                    email: data.email
                }
            });

            return 1

        } catch (error) {
            console.log(error)
        }

    }

    static async updatePassword(data, userId) {

        try {
            //Hashing and adding salt to the new password
            const salt = await bcrypt.genSalt(2);

            const hashedPassword = await bcrypt.hash(data.password, salt);

            //Otherwise we proceed to update the email.
            await prismadb.user.update({
                where: {
                    id: userId
                },
                data: {
                    password_hash: hashedPassword,
                    salt_hash: salt
                }
            });

            return 1

        } catch (error) {
            console.log(error)
        }

    }

    // static async delete(user_data) {
    //     try {
    //         const deletedUser = await prismadb.user.update({
    //             where: {
    //                 user_id: user_data.userId
    //             },
    //             data: {
    //                 user_active: false
    //             }
    //         })

    //         const deactivateduserClient = await prismadb.user_Client.updateMany({
    //             where: {
    //                 user_id: user_data.userId
    //             },
    //             data: {
    //                 user_status: false
    //             }
    //         });


    //         if (deletedUser === null || deactivateduserClient === null) {
    //             throw new Error("Non existent user.");
    //         }

    //         return 1;

    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // static async deactivate(userId) {
    //     try {
    //         const deletedUser = await prismadb.user.update({
    //             where: {
    //                 user_id: userId
    //             },
    //             data: {
    //                 user_active: false
    //             }
    //         });

    //         const deactivateduserClient = await prismadb.user_Client.updateMany({
    //             where: {
    //                 user_id: userId
    //             },
    //             data: {
    //                 user_status: false
    //             }
    //         });

    //         if (deletedUser === null || deactivateduserClient === null) {
    //             throw new Error("Non existent user.");
    //         }

    //         return 1;
    //     }
    //     catch (error) {
    //         console.log(error);
    //     }
    // }

    // static async activate(user_data) {
    //     try {

    //         const activatedUser = await prismadb.user.update({
    //             where: {
    //                 user_id: user_data.userId
    //             },
    //             data: {
    //                 user_active: true
    //             }
    //         });

    //         const activatedUserClient = await prismadb.user_Client.update({
    //             where: {
    //                 user_id: user_data.userId
    //             },
    //             data: {
    //                 user_status: true
    //             }
    //         })



    //         if (activatedUser === null || activatedUserClient === null) {
    //             throw new Error("Non existent user.");
    //         }

    //         return 1;

    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // static async findByType(type) {
    //     try {
    //         const result = await prismadb.user.findMany({ where: { user_type: type } })

    //         return result;
    //     } catch (err) {
    //         throw new Error("User type invalid")
    //     }
    // }

    // static async getData(userId) {
    //     try {
    //         const userClient = await prismadb.user_Client.findUnique({ where: { user_id: userId } })
    //         const user = await prismadb.user.findUnique({ where: { user_id: userId } })
    //         //console.log(user);
    //         return { ...userClient, user_email: user.user_email };
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    // static async getUserStats(userId) {
    //     try {
    //         const user = await prismadb.user_Client.findUnique({ where: { user_id: userId } });

    //         const purchases = await prismadb.purchase.findMany({ where: { user_buyer_id: userId } });

    //         const numPurchases = purchases.length;

    //         const sells = await prismadb.purchase.findMany({
    //             include: {
    //                 post: true
    //             }
    //         });

    //         const numSells = sells.filter(purchase => purchase.post.user_id === userId && purchase.post.post_buyed).length;

    //         const reviews = await prismadb.review.findMany({
    //             include: {
    //                 post: true
    //             }
    //         })

    //         const postReviewed = reviews.filter(review => review.post.post_reviewed && review.post.user_id === userId);
    //         const sumOfReviews = postReviewed.map(review => review.review_punctuation).reduce((acc, current) => acc + current, 0);
    //         const numOfReviews = postReviewed.length;
    //         const averageScore = Math.floor((sumOfReviews / numOfReviews)) || 0;

    //         return { user: user, numPurchases: numPurchases, numSells: numSells, averageScore: averageScore };
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    // static async sendData(body, userId) {
    //     try {

    //         if (body.username) {

    //             //Checking if username is already in the database

    //             const userRepeated = await prismadb.user.findFirst({
    //                 where: {
    //                     user_name: body.username
    //                 }
    //             })

    //             if (userRepeated !== null) return -1;

    //             const user = await prismadb.user_Client.update({
    //                 where: { user_id: userId },
    //                 data: { user_name: body.username }
    //             })
    //             return 1;
    //         }
    //         else if (body.email) {

    //             //Checking if email is already in the database
    //             const userRepeated = await prismadb.user.findFirst({
    //                 where: {
    //                     user_email: body.email
    //                 }
    //             })

    //             if (userRepeated !== null) return -1;

    //             const user = await prismadb.user.update({
    //                 where: { user_id: userId },
    //                 data: { user_email: body.email }
    //             })
    //             return 1;
    //         }

    //         //console.log(user);
    //         return 1;

    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    // static async sendPhoto(userId, post_file) {
    //     try {
    //         //Mount image in public directory
    //         await sharp(post_file.path).toFile(`./public/static/images/${post_file.originalname}`);
    //         await fsa.unlink(post_file.path);

    //         const updatedClient = await prismadb.user_Client.update({
    //             where: {
    //                 user_id: userId
    //             },
    //             data: {
    //                 user_photo: `${process.env.PHOTOS_URL}/${post_file.originalname}`
    //             }
    //         });

    //         return 1;
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // static async getUserImage(postImage) {
    //     try {
    //         await sharp(postImage.path).toFile(`./public/static/images/${postImage.originalname}`);
    //         await fsa.unlink(postImage.path);
    //         return 1;
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // static async getFavorites(userId) {
    //     try {

    //         //Getting data for the logged user.
    //         const userFavoriteData = await prismadb.user_Favorites.findMany({
    //             where: {
    //                 user_id: userId
    //             }
    //         })

    //         //Getting the favorites posts ids.
    //         const favoritesPostsId = userFavoriteData.map(register => register.post_id);

    //         //Getting the favorites posts objects.
    //         const favoritesPosts = await prismadb.post.findMany({
    //             where: {

    //                 AND: [
    //                     {
    //                         post_id: {
    //                             in: favoritesPostsId
    //                         }
    //                     },
    //                     { post_buyed: false },
    //                     { post_status: true }
    //                 ]

    //             }
    //         })
    //         return favoritesPosts.map(p => ({
    //             ...p, post_photos: [...p.post_photos.map((i) => {
    //                 const image = fs.readFileSync(i.replace("http://localhost:8080/", ""))
    //                 return image.toString('base64')
    //             })]
    //         }));
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    // static async addFavorite(userId, postId) {
    //     try {
    //         const userFavoriteData = await prismadb.user_Favorites.findMany({
    //             where: {
    //                 user_id: userId
    //             }
    //         })

    //         const curFavorite = userFavoriteData.find((p => p.post_id === postId))
    //         let fav = {}
    //         if (curFavorite) {
    //             return -1;
    //         } else {
    //             fav = await prismadb.user_Favorites.create({
    //                 data: {
    //                     user_id: userId,
    //                     post_id: postId
    //                 }
    //             })
    //         }

    //         return 1;
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    // static async toggleFavorite(userId, postId) {
    //     try {
    //         const userFavoriteData = await prismadb.user_Favorites.findMany({
    //             where: {
    //                 user_id: userId
    //             }
    //         })

    //         const curFavorite = userFavoriteData.find((p => p.post_id === postId))
    //         let fav = {}
    //         if (curFavorite) {
    //             fav = await prismadb.user_Favorites.delete({
    //                 where: {
    //                     user_favorites_id: curFavorite.user_favorites_id
    //                 }
    //             })
    //         } else {
    //             fav = await prismadb.user_Favorites.create({
    //                 data: {
    //                     user_id: userId,
    //                     post_id: postId
    //                 }
    //             })
    //         }

    //         return fav;
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    // static async getRanking() {
    //     const topVendors = await prismadb.user_Client.findMany({
    //         take: 3,
    //         orderBy: [
    //             {
    //                 user_ranking: 'desc'
    //             }
    //         ],
    //         where: {
    //             AND: [
    //                 {
    //                     NOT: [
    //                         {
    //                             user_ranking: null
    //                         }

    //                     ]
    //                 },
    //                 {
    //                     user_status: true
    //                 }
    //             ]
    //         }
    //     })

    //     return topVendors;
    // }

}