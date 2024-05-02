# Rainbow Voyage - Agencia de Viajes LGTBIQA+  🛩🏳️‍🌈

![Logo del Proyecto](./public/images/logo.webp)

## Descripción del Proyecto 

La agencia de viajes Rainbow Voyage ofrece una experiencia única para aquellos que buscan destinos inclusivos y vibrantes en España. En nuestra página principal, presentamos una cuidadosa selección de destinos ideales para la comunidad LGTBIQA+, cada una con sus propias experiencias festivas, culturales y gastronómicas.

Nuestro enfoque es proporcionar información sobre estas experiencias, asegurando que sean acogedoras y seguras para todos. Además, ofrecemos una variedad de opciones de alojamiento, actividades y servicios que se adaptan a las necesidades de nuestra comunidad diversa.

Para facilitar la búsqueda, nuestra plataforma permite filtrar las experiencias según el rango de precio, el número de participantes, el tipo de experiencia y la duración en días. Una vez seleccionada la experiencia.

Realizar una reserva es simple y fácil. Después de elegir una experiencia y un rango de fechas, los usuarios pueden verificar la disponibilidad y seleccionar el número de personas que desean participar. Luego, proceden a una página de confirmación donde revisan sus datos y el método de pago antes de finalizar la reserva. Así como confirmación que el titular y acompañantes son mayores de edad.

## Abstract

Rainbow Voyage is an innovative website designed to offer unique and safe travel experiences in selected destinations in the peninsula and archipelagos for the LGTBIQA+ community. This project addresses the need for inclusive destinations by providing detailed information on festive, cultural and gastronomic experiences in cities. The platform allows users to filter experiences according to their preferences, make reservations easily and manage their profiles and bookings. This project highlights the importance of LGTBIQA+ in creating a welcoming and authentic space for LGTBIQA+ travellers in the country.

## Público Objetivo y Justificación 

El público objetivo de Rainbow Voyage son personas pertenecientes a la comunidad LGTBIQA+ que buscan experiencias de viaje inclusivas y seguras en diferentes ciudades. Este grupo demográfico incluye a individuos de todas las edades, géneros y orientaciones sexuales que valoran la autenticidad, la diversidad y la aceptación en sus experiencias de viaje. Además, también se dirige a aquellos que desean apoyar y promover destinos inclusivos y respetuosos con la diversidad sexual.

**Justificación**:

  - **Demanda del Mercado**: Existe una creciente demanda de destinos y servicios turísticos que sean inclusivos y acogedores para la comunidad LGTBIQA+. LGTBIQA+ Rainbow Voyage aborda  esta demanda al ofrecer una plataforma dedicada a experiencias de viaje diseñadas específicamente para satisfacer las necesidades y preferencias de este público objetivo.

  - **Inclusividad y Seguridad**: La comunidad LGTBIQA+ a menudo enfrenta desafíos y discriminación al viajar, lo que puede afectar negativamente su experiencia. LGTBIQA+ Rainbow Voyage aborda esta preocupación al proporcionar información detallada sobre destinos seguros y experiencias amigables, garantizando así una experiencia de viaje positiva y sin preocupaciones.

  - **Promoción del Turismo LGTBIQA+**: La plataforma contribuye a la promoción del turismo LGTBIQA+ en España, destacando destinos y servicios que son conscientes y respetuosos de la diversidad sexual. Esto no solo beneficia a los viajeros LGTBIQA+, sino que también impulsa el desarrollo económico y social de las comunidades locales.

  - **Alianzas y Colaboraciones: LGTBIQA+**: Se pueden establecer alianzas estratégicas con empresas, organizaciones y destinos que comparten su compromiso con la inclusividad y la diversidad. Estas colaboraciones pueden ampliar el alcance de la plataforma y fortalecer su posición como líder en el mercado de viajes LGTBIQA+ en España.

En definitiva Raibow Voyage es una plataforma necesaria y relevante que atiende las necesidades de un público objetivo diverso y en crecimiento, al tiempo que promueve la inclusión, la seguridad y el desarrollo del turismo LGTBIQA+.

## Herramientas y Lenguajes 

- Front-end: HTML5, CSS3, JavaScript
- Framework de desarrollo web: Vue (Composition API + Typescript)
- Back-end: Node.js, Express.js
- Base de datos: PostgreSQL
- Sistema de control de versiones: Git
- Hospedaje web: Vercel
- ORM: Prisma

## Wireframes y mockups 

[Figma]

## Modelo E-R 

![Modelo E-R Final]()

## Diagrama de Casos de Uso 

![Diagrama de Casos de Uso Final]()

## Diagrama de Arquitectura de Producción 

![Diagrama de Arquitectura de Producción]()

## Gif de Demos de la Aplicación 

- ### Inicio de sesión y registro en la web
  Mediante el botón ‘Iniciar sesión’ podremos visualizar el formulario de inicio de sesión. En el caso del registro mediante el botón 'Registrarse' que nos pedirá los datos correspondientes (nombre de usuario, correo electrónico, contraseña,...).
  Ambos formularios tienen un sistema de validación de campos, en caso de que no se introduzcan los datos correctamente, se mostrarán mensajes de error.

![Gif de Demos]()

- ### Reserva de una experiencia
 Tanto como con la sesión iniciada como si no, dentro del detalle de la experiencia que queramos, podemos realizar la reserva pulsando el botón de "Desde ***€" para realizar la compra posteriormente. Nos aparecerá la reserva en 
  nuestra lista de reservas en Perfil > Mis Reservas.
  
![Gif de Demos]()

- ### Editar datos de la cuenta

  Una vez iniciado sesión, en Perfil podemos modificiar sus datos además de especificar preferencias y filtros como pueden ser: precio, número de personas, tipo de experiencia, duración en días, etc. Para una búsqueda de experiencias más personalizada.
      
![Gif de Demos]()

- ### Consulta del estado de las reservas

  Una vez iniciado sesión, en Perfil. El usuario visualizar las reservas que ha realizado a lo largo del tiempo en su perfil, las que están pendientes de aceptar por el gerente/administrador y las aceptadas.
 
![Gif de Demos]()

- ### Búsqueda y filtrado de destinos

  Los usuarios buscar podrán buscar destinos  basados en sus preferencias de perfil y por filtros generales (precio, número de personas, tipo de experiencia, etc).

![Gif de Demos]()

- ### Panel de control del administrador

  Como administrador de la web, una vez se ha iniciado sesión, desde el panel de control podemos estionar las diferentes reservas de los usuarios y enviar un correo electrónico al usuario confirmando su reserva o informando que su reserva se ha descartado.

![Gif de Demos]()


## Problemas Encontrados y Soluciones

A nivel técnico uno de los problemas a los que nos hemos enfrentado a lo largo del proyecto ha sido el hecho de subirlo a producción. El entorno de Vercel que permite la creación de una instancia/máquina bastante personalizable en comparación a otros servicios. Esto ha sido clave para la resolución de diversos problemas.

Aunque los problemas los hemos encontrado en cuanto a la estructura de la oferta de destinos debido a una limitada disponibilidad de destinos y actividades orientadas a la comunidad LGTBIQA+. Que ha requerido una proceso de investigación, y ha dificultado en un inicio la creación de una oferta diversa y atractiva para el usuario.

La complejidad en la identificación de destinos inclusivos, ya que lamentablemente a día de hoy es diícil determinar qué destinos son verdaderamente inclusivos y seguros para la comunidad LGTBIQA+, debido al rechazo o delitos de odio de una parte de la población.

O el desconocimiento del equipo sobre preferencias y demandas de la comunidad LGTBIQA+ en materia de destinos y actividades turísticas, lo que dificulta la planificación de una oferta que realmente responda a sus necesidades.


## Futuras Mejoras 

Una de las funcionalidades que nos hubiera gustado implementar hubiera sido la ampliación de nuestra oferta de destinos más allá de nuestra región actual. Queremos incluir una variedad más amplia de opciones internacionales conocidas por su apertura y aceptación hacia la comunidad LGTBIQA+.

Además, la aplicación se puede mejorar si se establece una comunidad en línea dentro de nuestra plataforma donde los usuarios podrán compartir experiencias, consejos de viaje y conectar con otros viajeros LGTBIQA+.

También hubiera sido interesante desarrollar un programa de membresía que ofrezca beneficios exclusivos a usuarios frecuentes, como descuentos en experiencia, acceso a eventos especiales y regalos promocionales. siempre y cuando se hubieran establecido partnerships estratégicos con organizaciones LGTBIQA+, agencias de viajes y empresas turísticas para ofrecer paquetes exclusivos y descuentos a los usuarios de Rainbow Voyage.

## Comparación de Objetivos y Logros 

Durante el desarrollo de nuestro proyecto, nos propusimos una serie de funcionalidades clave que consideramos fundamentales para garantizar una experiencia óptima para nuestros usuarios. Desde el inicio, priorizamos la implementación del sistema de registro de usuarios, el desarrollo del panel de administración y la creación de herramientas eficientes para la gestión de usuarios. Estas funcionalidades fueron abordadas con diligencia y dedicación, asegurando su correcto funcionamiento y su integración sin problemas en nuestra plataforma.

Además, reconocimos la importancia de fomentar la interacción entre nuestros usuarios como un elemento esencial para dar personalidad a nuestra web. Por ello, nos esforzamos en desarrollar herramientas de interacción efectivas, como un sistema de chat en tiempo real, comentarios dinámicos y una plataforma de mensajería privada, permitiendo así una conexión genuina entre los usuarios.

A lo largo del proceso de desarrollo, también nos enfocamos en la creación de una interfaz amigable y receptiva, diseñada para ofrecer una experiencia de usuario excepcional en cualquier dispositivo. 

En resumen, hemos logrado cumplir con todos nuestros objetivos iniciales, desarrollando todas las funcionalidades planificadas y proporcionando una plataforma sólida y atractiva para nuestros usuarios. Este éxito ha sido posible gracias a una planificación cuidadosa, una ejecución eficiente y un compromiso constante con la excelencia en cada etapa del proyecto.

## Conclusiones

- **Planificación y alcance del proyecto:** Este proyecto nos ha permitido realizar una planificación detallada y realista, considerando las necesidades y expectativas específicas de la comunidad LGTBI en el ámbito de los viajes. A lo largo del desarrollo, hemos enfrentado desafíos como la falta de conocimientos en nuestro equipo, lo que nos ha llevado a organizar e investigar las funcionalidades del servicio que podíamos implementar de manera efectiva.

- **Gestión de responsabilidades y tiempo:** Hemos aprendido a gestionar eficientemente las responsabilidades y el tiempo asignado a cada tarea y funcionalidad del proyecto. La diversidad de enfoques y habilidades dentro del equipo nos ha exigido una comunicación clara y una distribución equitativa de las tareas, lo que ha contribuido a un desarrollo más efectivo y a la consecución de nuestros objetivos en los plazos establecidos.

- **Familiarización con metodologías utilizadas:** Este proyecto nos ha brindado la oportunidad de familiarizarnos con metodologías de despliegue web como Vercel, y al mismo tiempo de asentar conocimientos de JS, CSS, VUE, PostgreSQL o Prisma.

- **Desafíos y logros:** El desarrollo de esta agencia de viajes LGTBIQA+ ha sido un proceso desafiante pero enormemente gratificante. Hemos superado obstáculos y adversidades, demostrando nuestra capacidad para adaptarnos y responder a las necesidades de la comunidad. La plataforma resultante cumple con las expectativas y necesidades iniciales, y estamos entusiasmados por seguir mejorando y expandiendo nuestra oferta para servir a más destinos y comunidades dentro del colectivo LGTBIQA+.

Estas conclusiones reflejan el compromiso de nuestro equipo con la inclusión, la diversidad y la excelencia en el servicio, y sentamos las bases para un futuro más tolerante 🏳️‍🌈.