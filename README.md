# E-commers

A small Java web application (NetBeans/Ant style) that provides basic user authentication and sign-in pages. This repository contains server-side Java Servlets and client-side HTML/CSS/JS for login and registration pages.

## Technology stack

- Java Servlets (Java EE / Jakarta EE style)
- Ant build (NetBeans-generated build scripts)
- Static front-end: HTML, CSS, JavaScript
- Deploy target: Servlet container such as Apache Tomcat

## Quick summary / features

- Login and registration pages (frontend under `web/`)
- Servlets to handle authentication and registration under `src/java/com/proj`
- NetBeans project files present in `nbproject/`
- Ant `build.xml` at project root (imports `nbproject/build-impl.xml`) — usual NetBeans targets are available

## Project structure (important files)

- `build.xml` - Ant entrypoint (imports `nbproject/build-impl.xml`)
- `web/` - Front-end assets (HTML/CSS/JS)
  - `index.html`, `Login.html`, `Signin.html`, `Login.js`, `Signin.js`, `style.css`, etc.
- `src/java/com/proj/` - Java servlet sources
  - `AdminLoginServlet.java`, `LoginServlet.java`, `RegisterServlet.java`
- `nbproject/` - NetBeans project metadata and detailed Ant targets
- `META-INF/` and `WEB-INF/` folders under `web/` containing optional context and configs

## Build (recommended)

You can build the project using NetBeans or Ant. Example PowerShell steps:

1) Build with Ant (from project root):

```powershell
cd 'c:\Users\abhishek\Desktop\github\E-commers'
ant
```

The default NetBeans/Ant build will compile sources. NetBeans projects commonly produce a `dist/` directory containing a `.war` file (if `do-dist` is enabled). If a `dist/` directory is created, you'll find the WAR there.

2) Alternatively, open the project in NetBeans and use Build / Clean & Build. NetBeans will run the same Ant targets and produce any configured artifacts.

Notes:
- If you need a clean build: `ant clean` then `ant`.
- If a specific Ant target exists in your `nbproject/build-impl.xml` (for example `dist`), use `ant dist`.

## Deploy to Tomcat (PowerShell)

1) Ensure Apache Tomcat is installed and running.
2) If a WAR was produced (e.g. `dist\Project1.war`), copy it to Tomcat's `webapps` folder:

```powershell
# adjust paths as needed
Copy-Item '.\dist\Project1.war' -Destination 'C:\path\to\apache-tomcat-9.0.XX\webapps\'
```

3) Start Tomcat (or restart) and access the app at:

http://localhost:8080/Project1/  (replace `Project1` with the war/context name if different)

If there is no WAR produced, you can deploy the exploded webapp (the `web` folder contents) as a context in Tomcat by placing the folder inside `webapps/` and ensuring the `WEB-INF` and `META-INF` structure is preserved.

## Running locally via NetBeans

- Open the project in NetBeans (`File -> Open Project` and select the `E-commers` folder).
- Run or Debug the project — NetBeans will deploy to the configured application server (Tomcat/GlassFish) if configured.

## Frontend notes

- Login-related pages are in `web/` (or top-level `web/` depending on which copy you use). There are HTML pages and corresponding JS/CSS files for client-side behavior and validation.
- `app.js` appears in the `web/` folder — inspect it for any client-side initialization or AJAX calls.

## Important servlets and behavior

- `src/java/com/proj/AdminLoginServlet.java` — Admin login handling
- `src/java/com/proj/LoginServlet.java` — User login handling
- `src/java/com/proj/RegisterServlet.java` — User registration handling

Check servlet mappings in `WEB-INF/web.xml` (if present) or any annotations in the servlet Java files to see the URL endpoints.

## Configuration

- `web/META-INF/context.xml` or `web/WEB-INF/web.xml` may contain environment-specific settings (JDBC resource names, context parameters). If the app needs a database, ensure the DB connection is configured in your servlet container and referenced correctly.

## Troubleshooting

- If classes fail to compile, ensure your JDK is installed and `JAVA_HOME` is set and that `ant` is on your PATH.
- If a servlet throws errors at runtime, check Tomcat logs (`logs/catalina.out` or `logs/localhost.*.log`) for stack traces.
- If static files (CSS/JS) fail to load, verify the paths in HTML and that the application context is correct.

