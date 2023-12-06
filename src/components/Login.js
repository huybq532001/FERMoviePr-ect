
import GoogleLogin from 'react-google-login';
import { useNavigate } from 'react-router-dom';

function Login() {

  const navigate = useNavigate();
  const responseGoogle = (response) => {
   if(response.error) {
  
      alert('Login failed!');
    } else {
      localStorage.setItem('accessToken', response.accessToken);
      navigate('/'); 
    }
  }

  return (
    <div style={{textAlign:'center', marginTop:'20%'}} >
      <GoogleLogin style={{color:'black'}}
        clientId="207028405584-bpumkqo559ipnvt6ko7p2u2ma1fmv70g.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />
    </div>
  );
}

export default Login;