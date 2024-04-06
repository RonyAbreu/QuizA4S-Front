import FormTemplate from "../components/FormTemplate";

const fields = [
  { name: "email", label: "Email", type: "email", placeholder: "Digite seu email" },
  { name: "password", label: "Senha", type: "password", placeholder: "Digite sua senha" },
];

const Login = () => {
  return (
    <FormTemplate
      title="Login"
      buttonText="Entrar"
      redirectText="Ainda não possui uma conta? Clique aqui!"
      redirectLink="/register"
      onSubmit={{ url: "/user/login", fields }}
    />
  );
};

export default Login;