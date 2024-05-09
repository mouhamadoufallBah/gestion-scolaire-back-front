import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/security/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotiflixService } from '../../../core/services/notiflix/notiflix.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  /* for showing or hiding password */
  passwordInputState: boolean = false;

  /* login form */
  loginForm: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder, private notiflixService: NotiflixService, private router: Router) {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required, Validators.minLength(7)]),
    })
  }

  togglePassword() {
    this.passwordInputState = !this.passwordInputState;
  }

  login() {
    this.notiflixService.loadingOn();

    const data = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    }

    if (data.email == "" || data.password == "") {
      this.notiflixService.notify('failure', 'Veuillez remplir tout les champ')
      this.notiflixService.loadingOff();
    } else {
      this.authService.login(data).then((res) => {
        if (!res.data) {
          this.notiflixService.notify('failure', 'Email ou mot de passe incorecte')
          this.notiflixService.loadingOff();
        } else {

          localStorage.setItem('userConnected', JSON.stringify(res.data));
          localStorage.setItem("token", JSON.stringify(res.token).replace(/['"]+/g, ''));

          if(res.data.role_id == 1){
            this.router.navigate(['/dashboard/admin']);
            this.notiflixService.loadingOff();
          }else if(res.data.role_id == 2){
            this.router.navigate(['/dashboard/professeur']);
            this.notiflixService.loadingOff();
          }else{
            this.router.navigate(['/dashboard/apprenant']);
            this.notiflixService.loadingOff();
          }
        }
      }).catch((err) => {
        console.log('erreur');
        this.notiflixService.loadingOffAfterDelay(3000);
        this.notiflixService.report('failure', 'Connexion à échouer', "Veuillez verifier votre serveur");
      });
    }


  }
}
