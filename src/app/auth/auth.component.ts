import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";
import { AuthResponseData, AuthService } from "./auth.service";

@Component({
    selector:'app-auth',
    templateUrl:'./auth.component.html'
})
export class AuthComponent implements OnDestroy{
    isLoginMode = true;
    isLoading = false;
    error: string = null;
    @ViewChild(PlaceholderDirective, {static:false}) alertHost: PlaceholderDirective;

    private closeSub: Subscription;

    constructor(private authService: AuthService,private router: Router,
        private comFacResolver: ComponentFactoryResolver){}

    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm){
        if(!form.valid){
            return ;
        }
        const email = form.value.email;
        const password = form.value.password;
        this.isLoading=true;

        let authObs: Observable<AuthResponseData>;

        if(this.isLoginMode){
            authObs = this.authService.login(email,password);             
        }else{
            authObs =this.authService.signUp(email,password);    
        }

        authObs.subscribe(
            resData => {
                this.isLoading=false;
                this.router.navigate(['/recipes']);
            },
            errorRes => {
                this.isLoading=false;
                this.error=errorRes;
                this.showErrorAlert(errorRes);
            }
        )
       
        form.reset();
    }

    onCloseHandler(){
        this.error=null;
    }

    private showErrorAlert(error: string){
        const alertCmpFac =this.comFacResolver.resolveComponentFactory(AlertComponent);
        const hostViewConRef =this.alertHost.viewContainerRef;
        hostViewConRef.clear();
        const comRef = hostViewConRef.createComponent(alertCmpFac);
        comRef.instance.message= error;
        this.closeSub = comRef.instance.close.subscribe(
            () =>  {
                this.closeSub.unsubscribe();
                hostViewConRef.clear();
            });

    }

    ngOnDestroy(): void {
        if(this.closeSub){
            this.closeSub.unsubscribe();
        }
    }
}