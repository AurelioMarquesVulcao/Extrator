const Mongoose = require('mongoose');



// modelo com tudo agregado.
const TesteSchema = new Mongoose.Schema( {	
	teste: String,
});

// module.exports.teste = teste;
export const TesteModel = Mongoose.model('Teste', TesteSchema)