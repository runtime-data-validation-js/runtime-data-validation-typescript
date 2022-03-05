
const akasha  = require('akasharender');
const hljs    = require('highlight.js'); // https://highlightjs.org/

const config = new akasha.Configuration();

// TODO - Update this to akashacms.github.io/open-source-site
// when that's ready

// This URL is used as the base URL of the website.
// Any time AkashaCMS code calculates the full URL of
// a thing in the site, it will use this URL.
config.rootURL("https://example.akashacms.com");

// This informs the Configuration where it is located
// in the file-system.  Any time AkashaCMS code calculates
// a pathname, it uses this plus the relative pathname
// from the root of the project.
config.configDir = __dirname;

// Directories for this project
config
    .addAssetsDir('assets')
    .addAssetsDir({
        src: 'node_modules/bootstrap/dist',
        dest: 'vendor/bootstrap'
    })
   .addAssetsDir({
        src: 'node_modules/jquery/dist',
        dest: 'vendor/jquery'
    })
    .addAssetsDir({
        src: 'node_modules/popper.js/dist',
        dest: 'vendor/popper.js'
    })
    .addAssetsDir({
        src: 'node_modules/highlight.js', dest: 'vendor/highlight.js'
    })
    .addAssetsDir({
        src: 'node_modules/@fortawesome/fontawesome-free',
        dest: 'vendor/fontawesome-free'
    })
    .addLayoutsDir('layouts')
    .addDocumentsDir('documents')
    .addDocumentsDir({ 
        src: 'api', dest: 'api',
        /* baseMetadata: {
            layout: 'article.html.ejs'
        } */
    })
    .addPartialsDir('partials');


config
    .use(require('@akashacms/theme-bootstrap'))
    .use(require('@akashacms/plugins-base'), {
        generateSitemapFlag: true
    })
    .use(require('@akashacms/plugins-breadcrumbs'))
    .use(require('@akashacms/plugins-booknav'))
    .use(require('@akashacms/plugins-external-links'))
    .use(require('@akashacms/plugins-footnotes'))
    .use(require('@akashacms/plugins-tagged-content'), {
        sortBy: 'title',
        // @tagDescription@ can only appear once
        headerTemplate: "---\ntitle: @title@\nlayout: tagpage.html.ejs\n---\n<p><a href='./index.html'>Tag Index</a></p><p>Pages with tag @tagName@</p><p>@tagDescription@</p>",
        indexTemplate: "---\ntitle: Tags for Runtime Data Validators\nlayout: tagpage.html.ejs\n---\n",
        pathIndexes: '/tags/'
    })
    .use(require('@akashacms/plugins-blog-podcast'), {
        bloglist: {
            news: {
                rss: {
                    title: "News",
                    description: "Announcements and news",
                    site_url: "http://akashacms.com/news/index.html",
                    image_url: "http://akashacms.com/logo.gif",
                    managingEditor: 'David Herron',
                    webMaster: 'David Herron',
                    copyright: '2015 David Herron',
                    language: 'en',
                    categories: [ "Node.js", "TypeScript", "JavaScript" ]
                },
                rssurl: "/news/rss.xml",
                rootPath: "news",
                matchers: {
                    layouts: [ "blog.html.ejs" ],
                    path: /^news\//
                }
            }
        }
    });

config
    .addFooterJavaScript({ href: "/vendor/jquery/jquery.min.js" })
    .addFooterJavaScript({ href: "/vendor/popper.js/umd/popper.min.js" })
    .addFooterJavaScript({ href: "/vendor/bootstrap/js/bootstrap.min.js" })
    .addStylesheet({ href: "/vendor/bootstrap/css/bootstrap.min.css" })
    .addFooterJavaScript({ href: "/vendor/highlight.js/lib/highlight.js" })
    .addFooterJavaScript({ script: 'hljs.initHighlightingOnLoad();' })
    .addStylesheet({ href: "/css/flatly.min.css" })
    .addStylesheet({ href: "/css/style.css" })
    .addStylesheet({ href: "/vendor/fontawesome-free/css/all.min.css" })
    .addStylesheet({ href: "/vendor/highlight.js/styles/tomorrow-night-blue.css" });

config.findRenderer('.html.md')
    .configuration({
        html:         true,         // Enable html tags in source
        xhtmlOut:     false,         // Use '/' to close single tags (<br />)
        breaks:       false,        // Convert '\n' in paragraphs into <br>
        // langPrefix:   'language-',  // CSS language prefix for fenced blocks
        linkify:      true,         // Autoconvert url-like texts to links
        typographer:  false,        // Enable smartypants and other sweet transforms
        /*  highlight: function (str, lang) {
            if (lang && hljs.getLanguage(lang)) {
              try {
                return '<pre class="hljs"><code>' +
                       hljs.highlight(lang, str, true).value +
                       '</code></pre>';
              } catch (__) {}
            }
            return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
        } /* */
        // For syntax highlighting
        /* highlight: function (str, lang) {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return hljs.highlight(lang, str).value;
                } catch (__) {}
            }
            return ''; // use external default escaping
        } */
    })
    .use(require('markdown-it-highlightjs'), { auto: true, code: true });


config.setMahabhutaConfig({
    recognizeSelfClosing: true,
    recognizeCDATA: true
});

config.prepare();
module.exports = config;
    