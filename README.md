# E-Commerce Web Application# E-Commerce Web Application



A modern Java-based e-commerce web application built with Java Servlets and a responsive front-end. This application provides user authentication, registration, and a seamless shopping experience with an intuitive admin dashboard.A modern Java-based e-commerce web application built with Java Servlets and a responsive front-end. This application provides user authentication, registration, and a seamless shopping experience with an intuitive admin dashboard.



------



## 📋 Table of Contents## 📋 Table of Contents



- [Features](#features)- [Features](#features)

- [Technology Stack](#technology-stack)- [Technology Stack](#technology-stack)

- [Project Structure](#project-structure)- [Project Structure](#project-structure)

- [Prerequisites](#prerequisites)- [Prerequisites](#prerequisites)

- [Installation](#installation)- [Installation](#installation)

- [Building the Project](#building-the-project)- [Building the Project](#building-the-project)

- [Deployment](#deployment)- [Deployment](#deployment)

- [Running Locally](#running-locally)- [Running Locally](#running-locally)

- [Project Architecture](#project-architecture)- [Project Architecture](#project-architecture)

- [Contributing](#contributing)- [Contributing](#contributing)

- [License](#license)- [License](#license)



------



## ✨ Features## ✨ Features



- **User Authentication**- **User Authentication**

  - Secure user login and registration  - Secure user login and registration

  - Admin login with elevated privileges  - Admin login with elevated privileges

  - Session management and password handling  - Session management and password handling



- **E-Commerce Functionality**- **E-Commerce Functionality**

  - Product catalog with multiple categories (Laptops, Smartphones, Cameras, Watches, Chairs, Clothes, etc.)  - Product catalog with multiple categories (Laptops, Smartphones, Cameras, Watches, Chairs, Clothes, etc.)

  - Shopping cart management  - Shopping cart management

  - Order placement and tracking  - Order placement and tracking

  - User profile management  - User profile management



- **Admin Dashboard**- **Admin Dashboard**

  - Admin login portal  - Admin login portal

  - Dashboard for managing products and orders  - Dashboard for managing products and orders

  - Enhanced administrative controls  - Enhanced administrative controls



- **Responsive UI**- **Responsive UI**

  - Clean and professional user interface  - Clean and professional user interface

  - Mobile-friendly design  - Mobile-friendly design

  - Smooth navigation and user experience  - Smooth navigation and user experience



------



## 🛠️ Technology Stack## 🛠️ Technology Stack



| Component | Technology || Component | Technology |

|-----------|-----------||-----------|-----------|

| **Backend** | Java Servlets (Java EE / Jakarta EE) || **Backend** | Java Servlets (Java EE / Jakarta EE) |

| **Frontend** | HTML5, CSS3, JavaScript || **Frontend** | HTML5, CSS3, JavaScript |

| **Build Tool** | Apache Ant (NetBeans-generated) || **Build Tool** | Apache Ant (NetBeans-generated) |

| **Server** | Apache Tomcat 9.0+ || **Server** | Apache Tomcat 9.0+ |

| **Project Management** | NetBeans IDE || **Project Management** | NetBeans IDE |



------



## 📁 Project Structure## 📁 Project Structure



``````

E-commers/E-commers/

├── src/├── src/

│   └── java/│   └── java/

│       └── com/proj/│       └── com/proj/

│           ├── AdminLoginServlet.java│           ├── AdminLoginServlet.java

│           ├── LoginServlet.java│           ├── LoginServlet.java

│           └── RegisterServlet.java│           └── RegisterServlet.java

├── web/├── web/

│   ├── index.html                 # Landing page│   ├── index.html                 # Landing page

│   ├── user-login.html            # User login page│   ├── user-login.html            # User login page

│   ├── user-register.html         # User registration page│   ├── user-register.html         # User registration page

│   ├── admin-login.html           # Admin login page│   ├── admin-login.html           # Admin login page

│   ├── dashboard.html             # User dashboard│   ├── dashboard.html             # User dashboard

│   ├── admin-dashboard.html       # Admin dashboard│   ├── admin-dashboard.html       # Admin dashboard

│   ├── products.html              # Product listing│   ├── products.html              # Product listing

│   ├── cart.html                  # Shopping cart│   ├── cart.html                  # Shopping cart

│   ├── orders.html                # Order history│   ├── orders.html                # Order history

│   ├── profile.html               # User profile│   ├── profile.html               # User profile

│   ├── css/                       # Stylesheets│   ├── css/                       # Stylesheets

│   ├── app.js                     # Client-side logic│   ├── app.js                     # Client-side logic

│   ├── META-INF/│   ├── META-INF/

│   │   └── context.xml│   │   └── context.xml

│   └── WEB-INF/│   └── WEB-INF/

│       └── web.xml│       └── web.xml

├── build.xml                      # Ant build configuration├── build.xml                      # Ant build configuration

├── nbproject/                     # NetBeans project metadata├── nbproject/                     # NetBeans project metadata

└── dist/                          # Compiled WAR files└── dist/                          # Compiled WAR files

``````



------



## 📋 Prerequisites## 📋 Prerequisites



Before you begin, ensure you have the following installed:Before you begin, ensure you have the following installed:



- **Java Development Kit (JDK)** - Version 8 or higher- **Java Development Kit (JDK)** - Version 8 or higher

- **Apache Ant** - Version 1.9 or higher- **Apache Ant** - Version 1.9 or higher

- **Apache Tomcat** - Version 9.0 or higher- **Apache Tomcat** - Version 9.0 or higher

- **NetBeans IDE** (optional, for development)- **NetBeans IDE** (optional, for development)



### Environment Setup### Environment Setup



Set the `JAVA_HOME` environment variable:Set the `JAVA_HOME` environment variable:



```powershell```powershell

# Windows PowerShell# Windows PowerShell

$env:JAVA_HOME = "C:\Program Files\Java\jdk-<version>"$env:JAVA_HOME = "C:\Program Files\Java\jdk-<version>"

$env:Path += ";C:\path\to\ant\bin"$env:Path += ";C:\path\to\ant\bin"

``````



------



## 🔧 Installation## 🔧 Installation



1. **Clone the repository:**1. **Clone the repository:**

   ```powershell   ```powershell

    git clone <repo link>

    cd <filename>

   ```   ```



2. **Verify your environment:**2. **Verify your environment:**

   ```powershell   ```powershell

   java -version   java -version

   ant -version   ant -version

   ```   ```



------



## 🏗️ Building the Project## 🏗️ Building the Project



### Option 1: Using Apache Ant (PowerShell)### Option 1: Using Apache Ant (PowerShell)



```powershellYou can build the project using NetBeans or Ant. Example PowerShell steps:

# Navigate to project directory

cd <file path> Build with Ant (from project root):



# Clean and build the project```powershell

ant cleancd <file path>

antant

```

# Generate distribution WAR file

ant distThe default NetBeans/Ant build will compile sources. NetBeans projects commonly produce a `dist/` directory containing a `.war` file (if `do-dist` is enabled). If a `dist/` directory is created, you'll find the WAR there.

```

2) Alternatively, open the project in NetBeans and use Build / Clean & Build. NetBeans will run the same Ant targets and produce any configured artifacts.

### Option 2: Using NetBeans IDE

Notes:

1. Open NetBeans- If you need a clean build: `ant clean` then `ant`.

2. Go to `File` → `Open Project`- If a specific Ant target exists in your `nbproject/build-impl.xml` (for example `dist`), use `ant dist`.

3. Select the `E-commers` folder

4. Click `Build` → `Clean and Build Project`## Deploy to Tomcat (PowerShell)



The compiled WAR file will be generated in the `dist/` directory.1) Ensure Apache Tomcat is installed and running.

2) If a WAR was produced (e.g. `dist\Project1.war`), copy it to Tomcat's `webapps` folder:

---

```powershell

## 🚀 Deployment# adjust paths as needed

Copy-Item '.\dist\Project1.war' -Destination 'C:\path\to\apache-tomcat-9.0.XX\webapps\'

### Deploy to Apache Tomcat```



1. **Locate the WAR file:**3) Start Tomcat (or restart) and access the app at:

   ```powershell

   # After building, your WAR file should be in:http://localhost:8080/Project1/  (replace `Project1` with the war/context name if different)

   ls -Path '.\dist\' -Filter *.war

   ```If there is no WAR produced, you can deploy the exploded webapp (the `web` folder contents) as a context in Tomcat by placing the folder inside `webapps/` and ensuring the `WEB-INF` and `META-INF` structure is preserved.



2. **Copy to Tomcat:**## Running locally via NetBeans

   ```powershell

   # Replace with your Tomcat installation path- Open the project in NetBeans (`File -> Open Project` and select the `E-commers` folder).

   Copy-Item '.\dist\E-commers.war' -Destination 'C:\apache-tomcat-9.0.X\webapps\'- Run or Debug the project — NetBeans will deploy to the configured application server (Tomcat/GlassFish) if configured.

   ```

## Frontend notes

3. **Start Tomcat:**

   - Windows: Run `catalina.bat` from `%CATALINA_HOME%\bin\`- Login-related pages are in `web/` (or top-level `web/` depending on which copy you use). There are HTML pages and corresponding JS/CSS files for client-side behavior and validation.

   - Or use Tomcat service manager- `app.js` appears in the `web/` folder — inspect it for any client-side initialization or AJAX calls.



4. **Access the application:**## Important servlets and behavior

   ```

   User Portal:  http://localhost:8080/E-commers/- `src/java/com/proj/AdminLoginServlet.java` — Admin login handling

   Admin Portal: http://localhost:8080/E-commers/admin-login.html- `src/java/com/proj/LoginServlet.java` — User login handling

   ```- `src/java/com/proj/RegisterServlet.java` — User registration handling



---Check servlet mappings in `WEB-INF/web.xml` (if present) or any annotations in the servlet Java files to see the URL endpoints.



## 💻 Running Locally## Configuration



### Using NetBeans (Recommended for Development)- `web/META-INF/context.xml` or `web/WEB-INF/web.xml` may contain environment-specific settings (JDBC resource names, context parameters). If the app needs a database, ensure the DB connection is configured in your servlet container and referenced correctly.



1. Open the project in NetBeans## Troubleshooting

2. Right-click the project → `Run`

3. The application will deploy to your configured Tomcat server- If classes fail to compile, ensure your JDK is installed and `JAVA_HOME` is set and that `ant` is on your PATH.

4. Access it at `http://localhost:8080/E-commers/`- If a servlet throws errors at runtime, check Tomcat logs (`logs/catalina.out` or `logs/localhost.*.log`) for stack traces.

- If static files (CSS/JS) fail to load, verify the paths in HTML and that the application context is correct.

### Using Ant and Tomcat


```powershell
# Build the project
ant

# Deploy (ensure Tomcat is configured in project properties)
ant run
```

---

## 🏛️ Project Architecture

### Backend Architecture

**Java Servlets** handle HTTP requests:
- `AdminLoginServlet.java` - Manages admin authentication
- `LoginServlet.java` - Handles user login requests
- `RegisterServlet.java` - Processes user registration

### Frontend Architecture

- **HTML Pages** - Structured markup for each view
- **CSS Stylesheets** - Responsive design and styling
- **JavaScript (app.js)** - Client-side validation, AJAX calls, and interactivity

### Request Flow

```
Browser Request
    ↓
HTML/JSP Page
    ↓
JavaScript (app.js)
    ↓
Java Servlet
    ↓
Response (JSON/HTML)
    ↓
Browser Display
```

---

## 📝 Servlet Endpoints

| Servlet | URL Mapping | Purpose |
|---------|-------------|---------|
| AdminLoginServlet | `/admin-login` | Admin authentication |
| LoginServlet | `/login` | User authentication |
| RegisterServlet | `/register` | User registration |

Check `WEB-INF/web.xml` for complete servlet mappings and URL patterns.

---

## ⚙️ Configuration

Application configuration is managed through:
- `web/META-INF/context.xml` - Tomcat context configuration
- `web/WEB-INF/web.xml` - Web application configuration
- Database credentials (if applicable) - Configure in your servlet container

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| **Compilation Error** | Verify JDK is installed and `JAVA_HOME` is set correctly |
| **Build Failure** | Run `ant clean` then rebuild with `ant` |
| **Tomcat Deployment Error** | Check Tomcat logs in `CATALINA_HOME/logs/` |
| **Static Files Not Loading** | Verify file paths in HTML and application context name |
| **Servlet Not Found (404)** | Check servlet mappings in `web.xml` |

### Viewing Logs

```powershell
# Tail Tomcat logs (PowerShell)
Get-Content -Path 'C:\apache-tomcat-9.0.X\logs\catalina.out' -Tail 50 -Wait
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

### Development Guidelines
1. Follow Java naming conventions
2. Write clean, documented code
3. Test changes locally before submitting
4. Create descriptive commit messages

---

## 📄 License

This project is open source and available under the MIT License. See the LICENSE file for details.

---

## 📧 Support

For issues, questions, or suggestions, please open an issue on the GitHub repository or contact the development team.

---
