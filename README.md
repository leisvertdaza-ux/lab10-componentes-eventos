# Laboratorio 10 - Componentes y Eventos

Desarrollo de Aplicaciones Empresariales - Tecsup

- **backend/**: servicio Web en Django REST Framework (`/api/producto/`) con django-cors-headers.
- **lab10/**: aplicación ReactJS (create-react-app) que consume el servicio, muestra "recuperando datos..." mientras carga y, como tarea, usa Material-UI y permite agregar nuevos productos (POST).
- **capturas/**: capturas del código y de la ejecución.

## Ejecutar

```
cd backend
pip install django djangorestframework django-cors-headers
python manage.py migrate
python manage.py loaddata productos
python manage.py runserver 8000
```

```
cd lab10
npm install
npm start
```
