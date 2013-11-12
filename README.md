RistrettoExample
================

Ristretto prototyping system skeleton. Latte + Livereload + Static mockup model.

You need PHP, [Node.js with NPM](http://nodejs.org) and [Grunt](http://gruntjs.com).

```shell
git clone https://github.com/ViliamKopecky/RistrettoExample.git
cd RistrettoExample
npm install
grunt dev
```

When you see `Gruntfile.js` config - you will see, that Ristretto is configured to serve on port 8000.

So in your browser open [http://localhost:8000/](http://localhost:8000/) and Ristretto should welcome you in the example.


*The first request will probably take a minute or two for updating PHP dependencies.*

Running
=======

When you have installed everything, you can start working like this:

```shell
grunt dev
```

When you have done some work, and you would like to share it with somebody, you might want to run `build` task:

```shell
grunt build
```

**Note:** Default directory to publish is `publish/` but you can change it directly in `ristretto.json`, maybe to your public Dropbox folder. Just don't set it to existing directory, **Ristretto deletes all contents of the publish directory!**

**Tip for publishing:** Use relative links to assets. Use relative links to other pages. Use `.html` instead of `.latte` in your links (`<a href="page.html">leads to page.latte</a>`). In future these cases will be automaticaly converted, but it's not implemented yet.
