import Image from "next/image";

export default function Home() {
  return (
    <main className="main_section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="login_mainbox">
              <div className="login_imgbox">
                <img src="/images/driver-image.png" alt="" className="img-fluid" />
              </div>
              <div className="login_formbox">
                <div className="login_form_heading">
                  <h1>Welcome to <span>Admin</span></h1>
                </div>
                <div className="login_form_para">
                  <p>
                    Welcome back! Please login to your account
                  </p>
                </div>
                <div className="login_form">
                  <form action="">
                    <div className="form_group">
                      <div className="form_icon">
                        <img src="/images/username-icon.svg" alt="" className="img-fluid" />
                      </div>
                      <input type="text" name="username" id="username" placeholder="Username" />
                    </div>
                    <div className="form_group">
                      <div className="form_icon">
                        <img src="/images/password-icon.svg" alt="" className="img-fluid" />
                      </div>
                      <input type="password" name="password" id="password" placeholder="Password" />
                    </div>
                    <div className="form_group">
                      <label htmlFor="remember">Remember me</label>
                      <input type="checkbox" name="remember" id="remember" />
                    </div>
                    <div className="form_group">
                      <input type="submit" value="Sign in" />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
