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
  // apiRoot = 'http://mifawghorn20170405015815.azurewebsites.net/mail/mi/msgfawg';
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
    return this.httpclient.post<MessageDto>(this.getPath, this.messageDto, {headers: this.httpheader})
      .catch(this.handleError);

  }

  deleteMsg(id): Observable<any> {
    console.log('message id is: ', id);
    return this.httpclient
      .get<any>(this.getApiBasePath() + 'hypertext/l1/deletemsgbyid/' + id, {headers: this.httpheader});
  }

  gethttpHeader() {
    console.log('user token is: ', this.userToken);
    this.httpheader = new HttpHeaders().set('Content-type', 'application/json')
    .append('Authorization', 'Bearer ' + this.userToken)
    .append('Access-Control-Allow-Origin', '*');
  }

  onLogin(model: any) {
    this.activeUserId = '';
     const httpheader = new HttpHeaders().set('Content-type', 'application/json')
    .append('Access-Control-Allow-Origin', '*');

    console.log('user token before is: ', this.userToken);
    //the TokenString interface is in the User.ts
    return this.httpclient
      .post(this.apiRoot + '/auth/login', model, {headers: httpheader})
      .map((data: TokenString) => {
        console.log('user token is: ', data);

        if (data.tokenString) {
          console.log('user token after is: ', this.userToken);
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
    console.log('in handle error.');
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

  postContacts(model: any) {
    return this.httpclient
      .post(this.getApiBasePath() + 'admin/l1/contact/do', model, {headers: this.httpheader})
      .catch(this.handleError);
  }

  putContacts(model: any) {
    return this.httpclient
      .put(this.getApiBasePath() + 'admin/l1/contact', model, {headers: this.httpheader})
      .catch(this.handleError);
  }


  getContacts(): Observable<Contact[]> {
    return this.httpclient
      .get<Contact[]>(this.getApiBasePath() + 'admin/l1/contact/getbyuserid/undo/' + this.activeUserId, {headers: this.httpheader});
  }

  deleteContact(id): Observable<any> {
    return this.httpclient
      .get<any>(this.getApiBasePath() + 'admin/l1/contact/deletebyid/' + id, {headers: this.httpheader});
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

  deleteDailyLog(id): Observable<any> {
    return this.httpclient
      .get<any>(this.getApiBasePath() + 'dailylog/l1/deletebydailyid/' + id, {headers: this.httpheader});
  }

  doEncryptDocument(dl: Doc, apiPath: string): Observable<Doc> {
    return this.httpclient
      .post<Doc>(apiPath, dl, {headers: this.httpheader}).catch(this.handleError);
  }


  doDecryptDocument(dl: Doc, apiPath: string): Observable<Doc> {
    return this.httpclient
      .get<Doc>(apiPath, {headers: this.httpheader}).catch(this.handleError);
  }

  deleteDocument(docid): Observable<any> {
    return this.httpclient
      .get<any>(this.getApiBasePath() + 'docs/l1/deletebydocumentid/' + docid, {headers: this.httpheader});
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

  // getUserByAmailAddr(aPath): Observable<Number> {
  //   return this.httpclient
  //   .get<Number>(aPath, {headers: this.httpheader})
  //   .catch(this.handleError);
  // }

  getUserByAmailAddr(apath: string): Observable<string> {
    return this.httpclient.get<string>(this.getApiBasePath() + 'admin/l1/user/isuseramailvalid/'
    + apath, {headers: this.httpheader}).catch(this.handleError);
  }



  getApiBasePath(): string {
    return 'https://4226-25056.el-alt.com/dex/';
    //return  'http://localhost:5445/dex/';
  }

}
