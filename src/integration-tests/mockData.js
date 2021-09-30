const user = {
  name: 'email',
  email: 'email@email.com',
  password: '12345678',
  role: 'user',
}

const admin = {
  name: 'admin',
  email: 'admin@admin.com',
  password: '12345678',
  role: 'admin',
}

const newAdmin = {
  name: 'newAdmin',
  email: 'newadmin@admin.com',
  password: '12345678',
}

const recipe = {
  name: 'Ovo Frito',
  ingredients: 'Ovo, manteiga',
  preparation: 'Coloque a manteiga para derreter na frigideira, quebre o ovo e coloque-o na frigideira, aguarde ficar ao ponto desejado',
}

const anotherRecipe = {
  name: 'Miojo a la minuta',
  ingredients: 'Macarrão Instântaneo',
  preparation: 'Prossiga com as instruções no verso do Miojo',
}

module.exports =  {
  user,
  admin,
  newAdmin,
  recipe,
  anotherRecipe,
};