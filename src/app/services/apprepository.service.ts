import { Injectable } from '@angular/core';
//import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
//import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
import { User, TokenString } from './models/User';
import { Contact } from './models/contact';
import { DailyLog } from './models/daily-log';
import { Doc } from './models/document';
import { Photo } from './models/Photo';
import { CMessageDto } from './models/cmessage';
import { CText } from './models/ctxt';
import { FsEdu } from './models/fsEdu';
import { MessageDto } from './models/messageDto';
// import {ContentType} from '@angular/http/src/enums';

// export interface MessageDto {
//   messageId: string;
//   message: string;
//   createdOn: string;
//   deleteAfter: string;
//   to: string;
//   subject: string;
//   from: string;
//   userId: string;
//   userName: string;
//   userLoginName: string;
//   toUserId: string;
//   fromUserId: string;
//   emailId: string;
// }

@Injectable()
export class AppRepositoryService {
  hold: any;
  baseUrl = environment.apiUrl;
  baseApiUrl = environment;
  apiRoot = ''; // this.getApiBasePath + 'hypertext/l1';
  userToken: any;
  activeUserId = '';
  activeUserLoginName: string;
  activeUserName: string;
  decodedToken: any;
  jwtHelper: JwtHelperService = new JwtHelperService();
  tempFreeId: string;
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
  cmessageDto: CMessageDto;
  httpheader: HttpHeaders;
  messages: Array<MessageDto> = new Array();

  tempMsgId: string;
  msgId: string;
  tid = Array.apply(null, Array(10));
  letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
               'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
               'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
               'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
               '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '1', '2',
                '3', '4', '5', '6', '7', '8', '9', '0', '1', '2', '3', '4', '5',
                 '6', '7', '8', '9'];

  lettersOnly = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
                 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
                 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
                 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];



  constructor(private router: Router, private httpclient: HttpClient) {
    //this.isApiLocal = false;
    this.apiRoot = this.getApiBasePath() + 'hypertext/l1';
    this.messageDto = {
      messageId: '',
      groupId: '',
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
      fromUserId: '',
      emailId: '',
      sCode: '',
      rid: ''
    };
  }

  // onSave() {
  //   let bnum =
  //     Math.random() * (Math.random() * Math.PI) * Math.random() * 10000;
  //   bnum = Math.floor(bnum);
  //   let anum = Math.random() * bnum;
  //   anum = Math.floor(anum);
  //   let cnum = Math.floor(anum) % 123;
  //   while (cnum < 97) {
  //     cnum = cnum + 25;
  //   }
  //   const ucode = '\uff47';
  // }

  // doIOF(msg: string): any {
  //   const header = new HttpHeaders().set('Content-type', 'application/json')
  //   .append('Access-Control-Allow-Origin', '*');

  //   this.getPath = this.getApiBasePath() + 'hypertext/l1/gettrialbymsgid/keep/' +
  //     msg;

  //   this.httpclient.get(this.getPath, {headers: header} ).subscribe((data: MessageDto) => {
  //     console.log('doIOF response is: ', data);
  //     if (data != null && data.userId != null) {
  //       this.isText = false;
  //       console.log('doIOF userId is not null');
  //     } else {
  //       this.isText = true;
  //       console.log('doIOF userId is null');
  //     }
  //   }, () => false);

  //   return this.isText;
  // }

  doGet(apiPath: string): Observable<any> {
    //this.gethttpHeader();
    return this.httpclient.get(apiPath, {headers: this.httpheader});
  }

  doDecrypt(msg: string, apiPath: string): Observable<any> {
    this.getPath = apiPath + msg; // .substring(0, 20);
    return this.httpclient.get(this.getPath, {headers: this.httpheader});
  }

  doEncrypt(msg: string, apiPath: string): Observable<any> {
    this.messageDto.message = msg; // this.message;
    this.messageDto.messageId = this.tempFreeId;
    this.getPath = apiPath;
    return this.httpclient.post<MessageDto>(this.getPath, this.messageDto, {headers: this.httpheader});

  }

  gethttpHeader() {
    this.httpheader = new HttpHeaders().set('Content-type', 'application/json')
    .append('Authorization', 'Bearer ' + this.userToken)
    .append('Access-Control-Allow-Origin', '*');
  }

  onLogin(model: any) {
    this.activeUserId = '';
     const httpheader = new HttpHeaders().set('Content-type', 'application/json')
    .append('Access-Control-Allow-Origin', '*');

    //the TokenString interface is in the User.ts
    return this.httpclient
      .post(this.apiRoot + '/auth/login', model, {headers: httpheader})
      .map((data: TokenString) => {
        if (data.tokenString) {
          this.userToken = data.tokenString;
          this.decodedToken = this.jwtHelper.decodeToken(data.tokenString);
          //  console.log('decodedToken is : ', this.decodedToken);
          //  console.log('decodedToken nameid is : ' + this.decodedToken.nameid);
          //  console.log('decodedToken name is : ' + this.decodedToken.unique_name);
          // console.log('decodedToken surname is : ' + this.decodedToken.family_name);

          this.activeUserId = this.decodedToken.nameid; // r.userLoginName;
          this.activeUserLoginName = this.decodedToken.unique_name;
          this.activeUserName = this.decodedToken.family_name;

          this.gethttpHeader();
          this.router.navigate(['/messages']);
        } else {
        }
      })
      .catch(this.handleError);
  }

  register(model: any) {
    return this.httpclient
      .post(this.apiRoot + '/auth/register', model, {headers: this.httpheader})
      .catch(this.handleError);
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  doCEncrypt(cmsg: CMessageDto, apiPath: string): Observable<CMessageDto> {
    cmsg.rid = this.makeRID(20);
    this.getPath = apiPath;
    return this.httpclient
      .post<CMessageDto>(this.getPath, cmsg, {headers: this.httpheader});
  }

  doCDecrypt(cmsgId: string, apiPath: string): Observable<CMessageDto> {
    this.getPath = apiPath + cmsgId;
    return this.httpclient.get<CMessageDto>(this.getPath, {headers: this.httpheader});
  }

  doCGet(apiPath: string): Observable<CMessageDto[]> {
    return this.httpclient.get<CMessageDto[]>(apiPath, {headers: this.httpheader});
  }


  // private requestOptions() {
  //   const headers = new Headers({ 'Content-type': 'application/json' });
  //   return new RequestOptions({ headers: headers, withCredentials: false });
  // }

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
    return Observable.throw(modelStateErrors || 'Server error - no feedback');
  }

  //activeUserId is set when the user logs in
  // getUsers(): Observable<User[]> {
  //   return this.http
  //     .get(this.baseUrl + this.activeUserId, this.jwt())
  //     .map(response => <User[]>response.json())
  //     .catch(this.handleError);
  // }

  postContacts(model: any) {
    // const header = new Headers();
    // header.append('Access-Control-Allow-Origin', '*');
    // header.append('Authorization', 'Bearer ' + this.userToken);
    // //console.log('user token: ' + this.userToken);

    // const options = new RequestOptions({
    //   headers: header,
    //   withCredentials: false
    // });

    //console.log('in postcontacts: ', model);
    return this.httpclient
      .post(this.getApiBasePath() + 'admin/l1/contact/do', model, {headers: this.httpheader})
      .catch(this.handleError);
  }

  putContacts(model: any) {
    // const header = new Headers();
    // header.append('Access-Control-Allow-Origin', '*');
    // header.append('Authorization', 'Bearer ' + this.userToken);
    // //console.log('user token: ' + this.userToken);

    // const options = new RequestOptions({
    //   headers: header,
    //   withCredentials: false
    // });

    return this.httpclient
      .put(this.getApiBasePath() + 'admin/l1/contact', model, {headers: this.httpheader})
      .catch(this.handleError);
  }


  //'http://localhost:5445/dex/admin/l1/user/getbyrelatedid/undo/'
  //'https://4226-25056.el-alt.com/dex/admin/l1/user/getbyrelatedid/undo/'
  getContacts(): Observable<Contact[]> {
    return this.httpclient
      .get<Contact[]>(this.getApiBasePath() + 'admin/l1/contact/getbyuserid/undo/' + this.activeUserId, {headers: this.httpheader});
      // .map(response => <Contact[]>response.json())
      // .catch(this.handleError);
  }

  getDocuments(): Observable<any> {
    return this.httpclient
      .get(this.getApiBasePath() + 'docs/l1/getdocbyuserid/keep/' + this.activeUserId, {headers: this.httpheader})
      .catch(this.handleError);
  }


  getPhotos(): Observable<any> {
    return this.httpclient
      .get(this.getApiBasePath() + 'photos/l1/getphotosbyuserid/keep/' + this.activeUserId, {headers: this.httpheader})
      //.map(response => <Photo[]>response.json())
      .catch(this.handleError);
  }


  // private jwt() {
  //   let token = this.userToken;
  //   //console.log('active user id is:' + this.activeUserId);
  //   //console.log('this is the user token: ' + token);
  //   if (token) {
  //     let headers = new Headers({ Authorization: 'Bearer ' + token });
  //     headers.append('Content-type', 'application/json');
  //     return new RequestOptions({ headers: headers });
  //   }
  // }

  aShuffle (array) {
    let i = 0
      , j = 0
      , temp = '';

    for (i = array.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1));
      temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }


  makeId(len: number): string {
  let j = 0;
  this.aShuffle(this.letters);
  this.aShuffle(this.letters);

  const array = new Uint32Array(len);
  window.crypto.getRandomValues(array);
  for (let i = 0; i < array.length; i++) {
    j = array[i] % 82;
    this.tid[i] = this.letters[j];
    //console.log(this.tid[i]);
  }

  return this.tid.join('');

  }

  makeRID(len: number): string {
    let j = 0;
    this.aShuffle(this.lettersOnly);
    this.aShuffle(this.lettersOnly);

    const array = new Uint32Array(len);
    window.crypto.getRandomValues(array);
    for (let i = 0; i < array.length; i++) {
      j = array[i] % 82;
      this.tid[i] = this.lettersOnly[j];
      //console.log(this.tid[i]);
    }

    return this.tid.join('');
    }

  setHttpHeaders(): Headers {
    const header = new Headers({ 'Content-type': 'application/json' });
    header.append('Authorization', 'Bearer ' + this.userToken);
    header.append('Access-Control-Allow-Origin', '*');
    return header;
  }


  doEncryptDailyLog(dl: DailyLog, apiPath: string): Observable<DailyLog> {
    return this.httpclient
      .post<DailyLog>(apiPath, dl, {headers: this.httpheader}).catch(this.handleError);
  }


  doDecryptDailyLog(dl: DailyLog, apiPath: string): Observable<DailyLog> {

    return this.httpclient
      .get<DailyLog>(apiPath, {headers: this.httpheader}).catch(this.handleError);
  }

  doEncryptDocument(dl: Doc, apiPath: string): Observable<Doc> {
    return this.httpclient
      .post<Doc>(apiPath, dl, {headers: this.httpheader}).catch(this.handleError);
  }


  doDecryptDocument(dl: Doc, apiPath: string): Observable<Doc> {
    return this.httpclient
      .get<Doc>(apiPath, {headers: this.httpheader}).catch(this.handleError);
  }

  doPostCtxt(txt: CText, apiPath: string): Observable<CText> {
    return this.httpclient
      .post<CText>(apiPath, txt, {headers: this.httpheader}).catch(this.handleError);
  }

  doGetCText(txtId: string, thePath: string): Observable<CText> {
    return this.httpclient
      .get<CText>(this.getApiBasePath() + thePath + txtId, {headers: this.httpheader}).catch(this.handleError);
  }

  doGetCtxtByUserId(): Observable<CText[]> {
    return this.httpclient
      .get<CText[]>(this.getApiBasePath() + 'ctxt/l1/getbyuserid/keep/' + this.activeUserId, {headers: this.httpheader})
      .catch(this.handleError);
  }

  getFsEdus(): Observable<FsEdu[]> {
    return this.httpclient
      .get<FsEdu[]>(this.getApiBasePath() + 'fsedu/l1/getbyuserid/keep/' + this.activeUserId, {headers: this.httpheader})
      .catch(this.handleError);
  }

  getApiBasePath(): string {
    return 'https://4226-25056.el-alt.com/dex/';
    //return  'http://localhost:5445/dex/';
  }

}
