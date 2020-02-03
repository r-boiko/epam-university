const mongoose    = require('mongoose'),
      log = require(INCPATH + '/log')(module),
      config = require(INCPATH + '/config');
      Q = require('q');

mongoose.connect(config.get('db'));
const db = mongoose.connection;

db.on('error', function (err) {
    log.error('connection error:', err.message);
});
db.once('open', function callback () {
    log.info("Connected to DB!");
});

let PostSchema = new mongoose.Schema({
  id:{
    type: String,
    required: true
  },
  type:{
    type: String,
    required: true
  },
  preview:{
    type: Object,
    required: true
  },
  head:{
    type: Object,
    required: true
  },
  body:{
    type: Object,
    required: true
  },
  footer:{
    type: Object,
    required: true
  },
});

PostSchema.set('toJSON', {
  virtuals: true,
  versionKey:false,
  transform: function (doc, ret) { delete ret._id }
});

let Article = mongoose.model('posts', PostSchema);

module.exports.Article = Article;
