import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {JwtHelper, tokenNotExpired} from 'angular2-jwt';
// import {ContentType} from '@angular/http/src/enums';

export interface MessageDto {
    messageId: string;
    message: string;
    createdOn: string;
    deleteAfter: string;
    to: string;
    subject: string;
    from: string;
    userId: string;
    userName: string;
    userLoginName: string;
    toUserId: string;
    fromUserId: string;
}


@Injectable()
export class AppRepositoryService {
    hold: any;
    // http://mifawghorn20170405015815.azurewebsites.net/

    // apiRoot = 'http://localhost:52233/mail/mi/msgfawg';
     apiRoot = 'https://4226-25056.el-alt.com/dex/hypertext/l1';
    //  apiRoot = 'http://localhost:5445/dex/hypertext/l1';
    userToken: any;
    activeUserId = '';
    activeUserLoginName: string;
    activeUserName: string;
    decodedToken: any;
    jwtHelper: JwtHelper = new JwtHelper();

    // apiRoot: string = 'http://b2n.gotdns.com:52233/mail/mi/msgfawg';
     // apiRoot = 'http://mifawghorn20170405015815.azurewebsites.net/mail/mi/msgfawg';
    // apiRoot = 'http://localhost:52233/mail/mi/msgfawg';
    getPath = 'all';
    numChars: number;
    isText: boolean;
    user: string;
    ato: string;

    public message: string;
    messageDto: MessageDto;


    messages: Array<MessageDto> = new Array();

    constructor(private http: Http, private router: Router) {
       this.messageDto = {
           messageId: '',
           message: '',
           createdOn: '',
           deleteAfter: '',
           to: '',
           subject: '',
           from: '',
           userId: '',
           userName: '',
           userLoginName: '',
           toUserId: '',
           fromUserId: ''

       };
    }

    onSave() {
        // var num = 0.12345678891E+180 + 0.18765453214E+258;
        // num = Date.now();
        // var a = [50000000];
        // var x = 0;
        // var y = 0;
        // var i = 0;
        // while (x++ < 50000000)
        // {
        //
        //   a[i++] = Math.random() * 10;
        // }
        // y = Date.now();
        //
        // console.log("a begin test: " + num / 1000);
        // console.log("end test: " + y / 1000);
        // console.log("diff: " + (y - num));

        // var bnum = Math.random() * 10000000;
        // var bnum = Math.random() * 31207482;
        let bnum = Math.random() * (Math.random() * Math.PI) * Math.random() * 10000;
        bnum = Math.floor(bnum);
        let anum = Math.random() * bnum;
        anum = Math.floor(anum);
        let cnum = (Math.floor(anum) % 123);
        while (cnum < 97) {
            cnum = cnum + 25;
        }
        console.log('bnum: ' + bnum + '   anum: ' + anum + '  cnum: ' + cnum);

        const ucode = '\uff47';
        console.log('char: ' + '"this is a test'.charCodeAt(1));
        console.log('"char: ' + ucode.charAt(0));

        // console.log("anum: " + anum );
        // console.log("cnum: " + cnum );
    }


    doIOF(msg: string): any {
        // console.log('GET decrypted text: ')
        // const headers = new Headers({'Access-Control-Allow-Origin': '*'});
        // const options = new RequestOptions({headers: headers});
        const header = new Headers();
        header.append('Access-Control-Allow-Origin', '*');
        const options = new RequestOptions({headers: header, withCredentials: false});

        // http://mifawghorn20170405015815.azurewebsites.net/

        // const path = 'http://localhost:52233/mail/mi/msgfawg:' + this.message;
        // console.log('value of msg in repository: ', msg);
        // const path = 'http://localhost:52233/mail/mi/msgfawg:' + this.message;
        //  console.log('in repository onDecrypt', this.message);

        // this.getPath = 'http://localhost:52233/mione/matrix/' + msg.substring(0, 10);
        this.getPath = 'http://localhost:5445/dex/hypertext/l1/getbymsgid/keep/' + msg.substring(0, 20);

        console.log('repos doIOF url: ', this.getPath);
       // console.log('message is: ', msg);
        this.http.get(this.getPath, options).subscribe((response: Response ) => {
            console.log('response is: ', response);
            const r = response.json();
            if (r === 1) {
                this.isText = false;
                console.log('istext value is: ', this.isText);
            } else { this.isText = true; }
        }, () => false );

        return this.isText;
        // return false;

    }

    doGet(apiPath: string): Observable<any> {
        // console.log('GET decrypted text: ')
        // const headers = new Headers({'Access-Control-Allow-Origin': '*'});
        // const options = new RequestOptions({headers: headers});
        const header = new Headers();
        header.append('Access-Control-Allow-Origin', '*');
        header.append('Authorization', 'Bearer ' + this.userToken);

        const options = new RequestOptions({headers: header, withCredentials: false});

        // http://mifawghorn20170405015815.azurewebsites.net/

        // const path = 'http://localhost:52233/mail/mi/msgfawg:' + this.message;
        // console.log('value of msg in repository: ', msg);
        // const path = 'http://localhost:52233/mail/mi/msgfawg:' + this.message;
        //  console.log('in repository onDecrypt', this.message);

        // this.getPath = this.apiPath + msg.substring(0, 20);
        // this.apiRoot = 'http://localhost:5445/dex/hypertext/l1';
        // this.getPath = this.apiRoot + '/getbyuserid/keep/' + this.activeUserId;
              // this.messageDto.userId; // + msg.substring(0, 10);
        // apiPath = apiPath + this.activeUserId;
        console.log('api url: ', apiPath);
        console.log('user token via doGet() : ', this.userToken);
        return this.http.get(apiPath, options)
            .map((response: Response) => {
                    console.log('response is: ', response.json());
                    return response.json();
                }
            );
    }



    doDecrypt(msg: string, apiPath: string): Observable<any> {
        // console.log('GET decrypted text: ')
        // const headers = new Headers({'Access-Control-Allow-Origin': '*'});
        // const options = new RequestOptions({headers: headers});
        const header = new Headers();
        header.append('Access-Control-Allow-Origin', '*');
        header.append('Authorization', 'Bearer ' + this.userToken);
        const options = new RequestOptions({headers: header, withCredentials: false});

        // http://mifawghorn20170405015815.azurewebsites.net/
        // ****************************************************************************************
        // this.getPath = 'http://localhost:5445/dex/hypertext/l1/do';
        this.getPath = apiPath + msg; // .substring(0, 20);
        // this.getPath = this.apiRoot + '/getbymsgid/undo/' + msg.substring(0, 10);

        console.log('api url: ', this.getPath);
        return this.http.get(this.getPath, options)
            .map((response: Response) => {
                // const data = response.json();
                this.messageDto = response.json();
                this.isText = true;
                return this.messageDto;
                }
            );
    }

    doEncrypt(msg: string, apiPath: string): Observable<any> {
        // console.log('get encrypted text: ');
        // const headers = new Headers({'Access-Control-Allow-Origin': ''});
        // const headers = new Headers({'Access-Control-Allow-Origin': '*'});
        // headers: this.noPreFlightHeaders,
        const header = new Headers({'Content-type': 'application/json'});
        header.append('Authorization', 'Bearer ' + this.userToken);
        header.append('Access-Control-Allow-Origin', '*');

        const options = new RequestOptions({headers: header, withCredentials: false});

        // this.headers = new Headers();
        // this.headers.append('Access-Control-Allow-Origin', '*');

        // this.apiRoot = "http://localhost:52233/mail/mi/fawgwarts/fawgedcontacts";
        // this.getPath =  this.apiRoot + "/fawgedcontacts";
        // this.getPath = 'http://localhost:52233/mail/mi/fawgedup/all/all';
        // this.numChars = this.message.length;
        // this.messageDto.userId = this.user;
        this.messageDto.message = msg; // this.message;
        // this.messageDto.createdOn = new Date().toDateString();
        // const dhold = new Date();
        // this.messageDto.deleteAfter = dhold.setDate(dhold.getDate() + 15).toString();
        console.log('messageDTO is: ', this.messageDto);

        // ****************************************************************************************
        // this.getPath = 'http://localhost:5445/dex/hypertext/l1/do';
        this.getPath = apiPath;

        // this.getPath = 'http://b2n.gotdns.com:52233/mail/mi/msgfawg/fawgdin';
        // this.getPath = 'http://mifawghorn20170405015815.azurewebsites.net/mail/mi/msgfawg/fawgdin';
        // console.log('rx: ', this.messageDto);

        return this.http.post(this.getPath, this.messageDto, options)
            .map((response: Response) => {
                    // const data = response.json();
                    this.messageDto = response.json();
                    return this.messageDto;
                }
            );
    }


    onLogin(model: any) {
        this.activeUserId = '';
        const headers = new Headers({'Content-type': 'application/json'});
        // headers.append('Access-Control-Allow-Origin', '*');
        const options = new RequestOptions({headers: headers, withCredentials: false});
        return this.http.post(this.apiRoot + '/auth/login', model, options)
            .map((response: Response) => {
               const r = response.json();
               console.log('login response: ' + r.tokenString);
               // if (r.pwd !== '') {
                if (r) {
                   // localStorage.setItem('token', r.pwd);
                   this.userToken = r.tokenString; // r.pwd;
                    this.decodedToken = this.jwtHelper.decodeToken(r.tokenString);
                    // console.log('decodedToken is : ', this.decodedToken);
                    // console.log('decodedToken nameid is : ' + this.decodedToken.nameid);
                    // console.log('decodedToken name is : ' + this.decodedToken.unique_name);
                    // console.log('decodedToken surname is : ' + this.decodedToken.family_name);

                    this.activeUserId = this.decodedToken.nameid; // r.userLoginName;
                    this.activeUserLoginName = this.decodedToken.unique_name;
                    this.activeUserName = this.decodedToken.family_name;


                        // this.doGet() // updates the email inbox list
                        //     .subscribe((data: MessageDto[] ) => {
                        //         this.messages = data;
                        //         // this.messages = this.messages;
                        //         // console.log('content of messages is: ', this.messages);
                        //         this.router.navigate(['/inbox']);
                        //     });


                    // ***************************** add this back **************************************************
                     this.router.navigate(['/messages']);
                    // console.log('successful login name: ' + r.tokenString);
               } else {

               }
            }).catch(this.handleError);
    }

    register(model: any) {
        return this.http.post(this.apiRoot + '/auth/register', model, this.requestOptions()).catch(this.handleError);
    }

    goHome() {
        this.router.navigate(['/home']);
    }

    private requestOptions() {
        const headers = new Headers({'Content-type': 'application/json'});
       // headers.append('Access-Control-Allow-Origin', '*');
        return new RequestOptions({headers: headers, withCredentials: false});
    }

    isEdBufferEmpty(): boolean {

        if (this.messageDto.message) {
            return false;
        } else {
            return true;
        }
    }

    reloadEditorContent(): string {
        if (this.messageDto) {
            return this.messageDto.message;
        }
    }


    private handleError(error: any) {
        const applicationError = error.headers.get('Application-Error');
        if (applicationError) {
          return Observable.throw(applicationError);
        }
        const serverError = error.json();
        let modelStateErrors = '';
        if (serverError) {
          for (const key in serverError) {
            if (serverError[key]) {
              modelStateErrors += serverError[key] + '\n';
            }
          }
        }
        return Observable.throw(modelStateErrors || 'Server error');
      }
}


