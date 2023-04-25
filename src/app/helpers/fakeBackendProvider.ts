import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, materialize, dematerialize } from 'rxjs/operators';

// array in local storage for registered users
const comptesKey = 'comptes';
const demandesCheckKey = 'demande chequier';
const demandesCardKey = 'demande carte';
let comptes: any[] = JSON.parse(localStorage.getItem(comptesKey)!) || [];
let demandesCheck: any[] = JSON.parse(localStorage.getItem(demandesCheckKey)!) || [];
let demandesCard: any[] = JSON.parse(localStorage.getItem(demandesCardKey)!) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        return handleRoute();

        function handleRoute() {
            switch (true) {
                case url.endsWith('/component/add-account') && method === 'POST':
                    return addAccount();

                case url.endsWith('/component/add-check') && method === 'POST':
                    return addCheck();
                
                case url.endsWith('/component/demande-check') && method === 'GET':
                    return getCheques();

                case url.endsWith('/component/demande-card') && method === 'GET':
                    return getCartes();

                case url.endsWith('/component/add-card') && method === 'POST':
                    return addCard();
                
                case url.endsWith('/component/account') && method === 'GET':
                     return getComptes();
                
                case url.endsWith('/component/transfer') && method === 'POST':
                     return updateCompte();
                
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }    
        }

        // route functions

        function addAccount() {
            const compte = body;
            console.log(body);
            comptes.push(compte);
            localStorage.setItem(comptesKey, JSON.stringify(comptes));
            return ok();
        }

        function addCheck() {
            const check = body;
            demandesCheck.push(check);
            localStorage.setItem(demandesCheckKey, JSON.stringify(demandesCheck));
            return ok();   
        }

        function addCard() {
            const card = body;
            demandesCard.push(card);
            localStorage.setItem(demandesCardKey, JSON.stringify(demandesCard));
            return ok();   
        }

        function getComptes() {
            return ok(comptes.map(x => basicDetails(x)));
        }

        function getCartes() {
            return ok(demandesCard.map(x => basicDetailsCard(x)));
        }

        function getCheques() {
            console.log(demandesCheck);
            return ok(demandesCheck.map(x => basicDetailsCheck(x)));
        }

        function updateCompte() {

            const transfer = body;
            console.log(transfer);
            for(let compte of comptes){
                if(compte.id == transfer.ribFrom){
                    console.log(parseInt(transfer.montant,10))
                compte.solde-=parseInt(transfer.montant,10);
                console.log(compte.solde);

                localStorage.setItem(comptesKey, JSON.stringify(compte));
                }

                if(compte.id == transfer.ribTo){
                    compte.solde+=parseInt(transfer.montant,10);
                    localStorage.setItem(comptesKey, JSON.stringify(compte));
                }
                }
            return ok();
        }

        // helper functions

        function ok(body?: any) {
            return of(new HttpResponse({ status: 200, body }))
                .pipe(delay(500)); // delay observable to simulate server api call
        }

        function basicDetails(compte: any) {
            const { id, type, gest, solde } = compte;
            return { id, type, gest, solde };
        }

        function basicDetailsCard(carte: any) {
            const { type, etat } = carte;
            return { type, etat };
        }

        function basicDetailsCheck(chequier: any) {
            const { rib, nbCheck, barre, etat } = chequier;
            return { rib, nbCheck, barre, etat };
        }
   
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};