module.exports = emailTpl = {
    replace: (lang, ary) => {
        ary.forEach((val, i) => {
            lang = lang.replaceAll('%' + i, val)
        })
        return lang
    },
    verify: `\
            <!doctype html>\
        <html lang="en" class= "h-100" >\
          <head>\
            <meta charset="utf-8">\
              <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">\
                <meta name="description" content="">\
                  <meta name="author" content="Mark Otto, Jacob Thornton, and Bootstrap contributors">\
                    <meta name="generator" content="Jekyll v4.1.1">\
                      <title>Verify Your Email</title>\
                      \
                      <link rel="canonical" href="https://getbootstrap.com/docs/4.5/examples/sticky-footer/">\
                      \
	                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">\
                      \
                      <style>\
                        .container {\
                                            width: auto;\
                  max-width: 680px;\
                  padding: 0 15px;\
                  }\
              \
                  .footer {\
                                            background - color: #f5f5f5;\
                  }\
              \
                    .bd-placeholder-img {\
                                            font - size: 1.125rem;\
                      text-anchor: middle;\
                      -webkit-user-select: none;\
                      -moz-user-select: none;\
                      -ms-user-select: none;\
                      user-select: none;\
                    }\
              \
                    @media (min-width: 768px) {\
                      .bd - placeholder - img - lg {\
                                            font - size: 3.5rem;\
                      }\
                    }\
                  </style>\
              \
            </head>\
                        <body class="d-flex flex-column h-100">\
                          <main role="main" class="flex-shrink-0">\
                            <div class="container">\
                              <h1 class="mt-5">Verify Your Email</h1>\
                              <p>Thanks for signing up! You must follow this link to activate your account:</p>\
                              <p><a href="https://backend-full-stack-exam.herokuapp.com/auth/email/verify/%0/%1">https://backend-full-stack-exam.herokuapp.com/auth/email/verify/%0/%1</a></p>\
                            </div>\
                          </main>\
                          \
                            <footer class="footer mt-auto py-3">\
                              <div class="container">\
                                <span class="text-muted">\
                                  <p>Backend-Full-Stack-Exam</p>\
                                  <p>Copyright © 2022</span></p>\
                              </div>\
                            </footer>\
                        </body>\
          </html>`

}