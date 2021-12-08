# For Future me:
If want to connect local Angular project with local Express &Node.js : watch this [YouTube video](https://www.youtube.com/watch?v=RSJxWJ6dCL4) for reference.

Things to do:
1. Construct Express with a "`router.get("/:var")`" route
2. In the service.ts file, use `"/api/var"` as the URL for http.get()
3. Create a `proxy.conf.json` to alter the path Angular uses.
4. To successfully compile and run in terminal: `ng serve --proxy-config proxy.conf.json`

# AngularRecipe

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
