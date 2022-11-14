export const UserEmailAlreadyExists = new Error('Este email já está em uso!');
export const UserInvalidCredentials = new Error('Email ou Senha inválidos!');

export const PostNotExists = new Error(
  'O post não foi encontrado em nosso banco de dados!'
);
export const IsNotPostOwner = new Error(
  'Não foi possível concluir a operação, Post pertence a outro usuário!'
);

export const CommentaryNotExists = new Error(
  'O comentário não foi encontrado em nosso banco de dados!'
);
export const IsNotCommentaryOwner = new Error(
  'Não foi possível concluir a operação, Comentário pertence a outro usuário!'
);
