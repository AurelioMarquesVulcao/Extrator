const Mongoose = require('mongoose');

const TesteSchema = new Mongoose.Schema( {	
	teste: String,
});

export const TesteModel = Mongoose.model('Teste', TesteSchema)