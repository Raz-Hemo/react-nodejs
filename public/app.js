var processResult=function(s){
	if(s==="success")
		return "Logged in successfully!";
	else
		return "Ah-Ah-Ah, you didn't say the magic word!"
};

var LoginForm = React.createClass({
	getInitialState: function() {
    return {user:'',pass:'',result:''};
  },
  handleUserChange:function(arg){
	  this.setState({user:arg.target.value});
  },
  handlePassChange:function(arg){
	  this.setState({pass:arg.target.value});
  },
  //send user and pass in a json to server for auth
  handleSubmit: function(e){
	  e.preventDefault();
	  var tosend = {'user':this.state.user,'pass':this.state.pass};
	  console.log(tosend);
	  console.log(JSON.stringify(tosend));
	  $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
	  contentType:'application/json',
      data: JSON.stringify(tosend),
      success: function(data) {
        this.setState({result:processResult(data)});
      }.bind(this),
      error: function(xhr, status, err) {
		console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  //login form composed of a text field, a password field and a button
  render: function() {
    return (
	<form className="loginForm" onSubmit={this.handleSubmit}>
      <input type="text" placeholder="Username" value={this.state.user} onChange={this.handleUserChange}></input>
	  <input type="password" placeholder="Password" value={this.state.pass} onChange={this.handlePassChange}></input>
	  <input type="submit" value="Log In"></input>
	  <h1 class="center">
	  {this.state.result}
	  </h1>
	</form>
    );
  }
});
ReactDOM.render(
  <LoginForm url="/login"/>,
  document.getElementById('content')
);