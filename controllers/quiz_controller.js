var models = require ('../models/models.js');

// GET /quizes/:id
exports.load =function (req, res, next, quizId){
  models.Quiz.find(quizId).then(
    function(quiz){
      if(quiz){
        req.quiz=quiz;
        next();
      }else{next(new Error('No existe quizId=' + quizId))}
    }
    ).catch(function(error){next(error)});
};

exports.show = function (req, res) {
  // models.Quiz.find(req.params.quizId).then(function(quiz) {
     res.render('quizes/show', {quiz: req.quiz, errors: []});
   //})
};

//GET /quizes/:id/answer

exports.answer = function (req, res){
  // models.Quiz.find(req.params.quizId).then(function(quiz) {
    var resultado= 'Incorrecto';
     if (req.query.respuesta === req.quiz.respuesta){
      resultado='Correcto';
     }
     res.render('quizes/answer', {quiz:req.quiz, respuesta: resultado, errors: []}); 
     //      res.render ('quizes/answer', 
       //               { quiz: quiz, respuesta: 'Correcto'});
    // }else {
         //  res.render('quizes/answer', 
           //           { quiz: quiz, respuesta: 'Incorrecto'});
    // }
  // })
};

//GET /quizes

exports.index = function(req, res){
  models.Quiz.findAll().then(function(quizes){
    res.render('quizes/index.ejs', {quizes: quizes, errors: []});
  }
  ).catch(function(error){next(error)});
};

exports.new = function(req, res){
  var quiz = models.Quiz.build( //crea objeto quiz
    { pregunta: "Pregunta", respuesta: "Respuesta"}
    );

  res.render('quizes/new', {quiz: quiz, errors: []});
};

//POST /quizes/create

exports.create = function(req, res){
  var quiz = models.Quiz.build( req.body.quiz);

  quiz
  .validate()
  .then(
    function(err){
      if(err){
        res.render('quizes/new', {quiz: quiz, errors: err.errors});
      } else{
        quiz //save: guarda en DB campos pregunta y respuesta de quiz
        .save({fields: ["pregunta", "respuesta"]})
        .then( function(){ res.redirect('quizes')})
      }   //res.redirect: Redireccion HTTP a lista de preguntas
    }
  );
};    