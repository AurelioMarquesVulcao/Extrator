const mongoose = require('mongoose');



// modelo com tudo agregado.
export const teste = mongoose.model('Teste', {
	// Data: new Date(),
	// DataCadastro: 'teste',
	teste: String,
	
}, 'teste');

// module.exports.teste = teste;