RistrettoExample
================

Example of prototyping with Ristretto

You need PHP, [Node.js with NPM](http://nodejs.org) and [Grunt](http://gruntjs.com).

```shell
git clone https://github.com/ViliamKopecky/RistrettoExample.git
cd RistrettoExample
npm install
grunt
```

When you see `Gruntfile.js` config - you will see, that Ristretto is configured to serve on port 2013.

So in your browser open [http://localhost:2013/](http://localhost:2013/) and Ristretto should welcome you in the example.


*The first request will probably take a minute or two for updating PHP dependencies.*

Running
=======

When you have installed everything, you can run server like this:

```shell
grunt
```

When you have done some work, and you would like to share it with somebody, you might want to run `publish` task:

```shell
grunt publish
```

**Note:** Default directory to publish is `publish/` but you can change it directly in `Gruntfile.js`, maybe to your public Dropbox folder. Just don't set it to existing directory, **Ristretto deletes all contents of the publish directory!**
