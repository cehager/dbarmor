// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-message',
//   templateUrl: './message.component.html',
//   styleUrls: ['./message.component.scss']
// })
// export class MessageComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

import {AfterViewInit, Component, OnInit} from '@angular/core';
import { AppRepositoryService } from '../services/apprepository.service';
import { MessageDto } from '../services/models/messageDto';
// import {AppRepositoryService, MessageDto} from './services/app-repository.service';
import {forEach} from '@angular/router/src/utils/collection';
import {MessageService} from 'primeng/components/common/messageservice';
import {Message, MenuItem} from 'primeng/primeng';
import {FormControl} from '@angular/forms';
import {DataTable} from 'primeng/primeng';
import { AlertifyService } from '../services/alertify.service';
import { Contact } from '../services/models/contact';
import * as moment from 'moment';

declare var $: any;

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, AfterViewInit {

    // msgGrowls: Message[] = [];
    items: MenuItem[];
    autoCompleteContacts: string[] = [];
    autoCompleteContact: string;
    activeUserContacts: Contact[];
    messages: MessageDto[];
    rowsSelected: Array<MessageDto>;
    editorContent: string;
    emailTo: string;
    emailSubject: string;
    emailUser: string;
    emailMsgId: string;
    emailFrom: string;
    emailFromUserId: string;
    emailToUserId: string;
    emailId: string;
    toUserId: string;
    isMsgText: boolean;
    lastRowSelected: any;
    apiPath: string;
    ed: any;
    edContentGet: string;
    delay: number;

    // rowSelected: any;
    constructor(public appRepository: AppRepositoryService, private messageSvc: MessageService, private alertify: AlertifyService) {  }

    options: Object = {
        key: 'WC7A5D4A4fG3A7A7C7A3B3C2G3C2F2ybeiB-11gdB-7A3c1jd==',
        charCounterCount: true,
        toolbarButtons: ['fontFamily', 'fontSize', 'color', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript',
            'superscript', 'align', 'outdent', 'indent', 'paragraphFormat',
           'insertHR', 'clearFormatting', 'undo', 'redo',  'emoticons', 'print', 'spellChecker',
            '|', 'clear'],
        toolbarButtonsXS: ['bold', 'italic', 'underline', 'strikeThrough',
            'fontSize', 'alert', 'paragraphFormat'],
        toolbarButtonsSM: ['bold', 'italic', 'underline', 'strikeThrough',
            'fontSize', 'alert', 'paragraphFormat'],
        toolbarButtonsMD: ['bold', 'italic', 'underline', 'strikeThrough',
            'fontSize', 'alert', 'paragraphFormat'],
        quickInsertButtons: ['image', 'table'],
        height: 328,
        fontSizeDefaultSelection: '14',
        placeholderText: 'PRIVATIZE yourself, start typing here...',
        saveInterval: 0,
        pastePlain: true,
        htmlExecuteScripts: false,
        enter: $.FroalaEditor.ENTER_BR,
        codeBeautifierOptions: {
            end_with_newline: true,
            indent_inner_html: true,
            extra_liners: '["h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "pre", "ul", "ol", "table", "dl"]',
            brace_style: 'expand',
            indent_char: ' ',
            indent_size: 4,
            wrap_line_length: 0
        }
    };

    onRowSelected(lastRow) {
        // console.log('all rows selected are: ', this.rowsSelected);
        // this.messages = this.rowsSelected;
        this.editorContent = this.rowsSelected[0].message;
        this.emailUser = this.rowsSelected[0].userId;
        this.emailMsgId = this.rowsSelected[0].messageId;
        this.emailTo = this.rowsSelected[0].to;
        this.emailSubject = this.rowsSelected[0].subject;
        this.emailFrom = this.rowsSelected[0].from;
        this.lastRowSelected = lastRow;
        this.emailId = this.rowsSelected[0].emailId;
        this.isMsgText = false;
        this.ed.froalaEditor('edit.off');

        // this.toUserId = this.rowsSelected[0].toUserId;
        // this.ed.froalaEditor('edit.off');
        // console.log('messages: ', this.rowsSelected[0].message);
    }

  ngOnInit() {
    //   $.FroalaEditor.DefineIcon('alert', {NAME: 'info'});
    //   $.FroalaEditor.RegisterCommand('alert', {
    //       title: 'Blackout',
    //       focus: false,
    //       undo: false,
    //       refreshAfterCallback: true,

    //       callback: function () {
    //           alert('This is a future feature that will cause highlighted text to be blacked out!');
    //       }
    //   });

      $.FroalaEditor.DefineIcon('clear', {NAME: 'ban'});
      $.FroalaEditor.RegisterCommand('clear', {
          title: 'Clear (erase and start over)',
          focus: false,
          undo: true,
          refreshAfterCallback: true,
          callback: function () {
              this.html.set('');
              //this.apprepository.isText = true;
              this.events.focus();
          }
      });

    //   $.FroalaEditor.DefineIcon('archive', {NAME: 'shield'});
    //   $.FroalaEditor.RegisterCommand('archive', {
    //       title: 'Save Local',
    //       focus: true,
    //       undo: true,
    //       refreshAfterCallback: true,
    //       callback: function () {
    //           this.events.focus();
    //       }
    //   });


    //   $.FroalaEditor.DefineIcon('delete', {NAME: 'trash'});
    //   $.FroalaEditor.RegisterCommand('delete', {
    //       title: 'Delete',
    //       undo: true,
    //       refreshAfterCallback: true,
    //       callback: function () { }
    //   });

      // NOTE: needs to be moved to emailRespository.getFor("userid") & returns all encrypted emails.
      // this.appRepository.doGet()
      //     .subscribe((data: MessageDto[] ) => {
      //       this.appRepository.messages = data;
      //       this.messages = this.appRepository.messages;
      //
      //       // console.log('content of messages is: ', this.messages);
      //     }, (error) => { console.log('doGet failed', error); });

      this.edContentGet = 'html.get';
      this.ed = $('div#fred');

      this.appRepository.isText = true;
      // this.messageSvc.add({severity: 'success', summary: 'In-Box Messages', detail: 'Click on message to view in editor.'});
      // this.delay = 5000;
      // this.msgGrowls.push({severity: 'success', summary: 'In-Box Messages', detail: 'Click on message to view in editor.'});

    //   this.ed.on('froalaEditor.commands.after', (e, editor, cmd, param1, param2) => {
    //       alert('Text has been encrypted and saved.');
    //   });

      // this.ed.clear();
      this.ed.on('froalaEditor.commands.after', (e, editor, cmd, param1, param2) => {
          //console.log('command is: ', cmd);
          if (cmd === 'save') {
              this.doEncrypt();
              //this.alertify.success('Message has been saved!');
            //   this.emailTo = '';
            //   this.emailSubject = '';
            //   this.editorContent = '';
          }
          if (cmd === 'clear') {
              this.isMsgText = true;
              this.emailTo = '';
              this.emailSubject = '';
              this.ed.froalaEditor('edit.on');
          }
      });


      this.items = [
        {label: 'Create New Message', icon: 'fa-refresh', command: () => {
            this.doCreateNewMsg();
            this.isMsgText = true;
            this.ed.froalaEditor('edit.on');
            //this.alertify.message('Create New Message');
        }},
        {label: 'Archive', icon: 'fa-close', command: () => {
            this.alertify.message('Archive');
            this.isMsgText = true;
            this.ed.froalaEditor('edit.on');
        }},
        {label: 'Save Local', icon: 'fa-close', command: () => {
            this.alertify.message('Save Local');
            this.isMsgText = true;
            this.ed.froalaEditor('edit.on');
        }},
        {label: 'Delete', icon: 'fa-close', command: () => {
            this.alertify.message('delete');
            this.isMsgText = true;
            this.ed.froalaEditor('edit.on');
        }}
        ];

        this.isMsgText = true;
        this.ed.froalaEditor('edit.on');
        this.emailTo = '';

    //   this.ed.froalaEditor({
    //     width: '490',
    //     height: '350'
    //   });


      // this.appRepository.doGet().subscribe( (data: MessageDto[]) => {
      //     this.appRepository.messages = data;
      //     this.messages = data; });
     this.doGetContacts();
  }


//   doDeleteInMem(to: string, subject: string, edContent: string) {
//     to = '';
//     subject = '';
//     edContent = '';
// }

  ngAfterViewInit() {
        // this.apiPath = 'https://4226-25056.el-alt.com/dex/hypertext/l1/do';
         // this.appRepository.doGet('http://localhost:5445/dex/hypertext/l1/getbytouserid/keep/'
         // + this.appRepository.activeUserId) // updates the email inbox list
         this.appRepository.doGet(this.appRepository.getApiBasePath() + 'hypertext/l1/getbytouserid/keep/'
                + this.appRepository.activeUserId) // updates the email inbox list
            .subscribe((data: MessageDto[] ) => {
               console.log('ngAfterViewInit: ', data);

                this.appRepository.messages = data;
                for (let i = 0; i < this.appRepository.messages.length; i++) {
                    this.appRepository.messages[i].createdOn = moment(this.appRepository.messages[i].createdOn).format('MM/DD/YYYY');
                }
                this.messages = this.appRepository.messages;
                this.isMsgText = true;
                this.ed.froalaEditor('edit.on');

                //console.log('ngAfterViewInit fired : ', this.messages);
            });

            // this.ed.on('froalaEditor.commands.after', function (e, editor, cmd, param1, param2) {
            //     console.log('editor command is: ', cmd);
            //     if (cmd === 'clear') {
            //         this.emailTo = '';
            //         this.emailSubject = '';
            //     }

            //   });

         // this.appRepository.doGet().subscribe( (data: MessageDto[]) => {
         //     this.appRepository.messages = data;
         //     this.messages = data; });
        // console.log('ngAfterViewInit fired : ', this.messages);
    }


    doEditCompleted(editInfo) {
      const fieldChanged = editInfo.column.field;
      const newRowValues = editInfo.data;
      //console.log('field changed is: ', fieldChanged);
      //console.log('row values are: ', newRowValues);
    }

    doCreateNewMsg() {
        this.editorContent = '';
        this.emailSubject = '';
        this.emailTo = '';
        this.ed.froalaEditor('edit.on');
        this.isMsgText = true;
    }

    doGetContacts() {
        this.appRepository.getContacts().subscribe((contacts: Contact[]) => {
            this.activeUserContacts = contacts;
            //for (let i = 0; i < contacts.length; i++) {
              //  this.autoCompleteContacts[i] = contacts[i].amailAddr;
           // }
            //console.log('active user contacts: ', this.activeUserContacts);
          }, error => {
            console.log(error);
            //this.alertify.error(error);
          });
    }

    getFilteredContacts(event) {
        let query = event.query;
        //if (this.autoCompleteContacts.length === this.activeUserContacts.length) {
            for (let i = 0; i < this.activeUserContacts.length; i++) {
                this.autoCompleteContacts[i] = this.activeUserContacts[i].amailAddr;
            }
        //}
        //console.log('before autocomplete contacts are: ', this.autoCompleteContacts);
        this.autoCompleteContacts = this.filterContacts(query, this.autoCompleteContacts);
        //console.log('after autocomplete contacts are: ', this.autoCompleteContacts);
    }

    filterContacts(query, contacts: string[]): string[] {
        let filtered: string[] = [];
        for (let i = 0; i < contacts.length; i++) {
            let contact = contacts[i];
            if (contact.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                filtered.push(contact);
                //console.log('query is: ', query);
               //console.log('contact is: ', contact);
               // console.log('amailaddr is: ', contact);
                }
        }
        //console.log('filtered value is: ', filtered);
        return filtered;
    }

    doEncrypt() {
        let isformvalid: boolean;
        isformvalid = true;
        //TODO: need validation that emailto exists
        //console.log('emailto value is: ', this.emailTo);
        if (this.emailTo === 'undefined' || this.emailTo === '') {
            this.alertify.error('EmailTo field: must have a value.');
            isformvalid = false;
        }
        let rmsg = this.ed.froalaEditor(this.edContentGet);
       // console.log('editor content is: ', rmsg);
        rmsg = rmsg.replace(/&nbsp;/gi, '');
        rmsg = rmsg.trim();
        if (rmsg.length === 0) {
            //this.alertify.error('Message must contain at least one character.');
            this.alertify.dialog('Got It!', '<h4>There is nothing to send or encrypt!<h4>');
            isformvalid = false;
        }

        if ( this.emailTo === 'undefined' || this.emailTo === null || this.emailTo.length === 0) {
            this.alertify.dialog('Got It!', '<h4>The mail-To field is empty. You must have a Mail-To address.<h4>');
        }

        let isFound = false;
        for (let i = 0; i < this.activeUserContacts.length; i++) {
            //let contact = this.activeUserContacts[i].amailAddr;
            if (this.activeUserContacts[i].amailAddr === this.emailTo) {
                isFound = true;
                //console.log('query is: ', query);
                }
        }
        //NOTE: if mailto id is not in the contacts list, check the server
        // if (!isFound) {
        //         this.appRepository.getContacts().subscribe((contacts: Contact[]) => {
        //           //console.log(contacts);
        //         }, error => {
        //           console.log(error);
        //           this.alertify.error('The EmailTo Address does NOT exist! Double check spelling.');
        //           isformvalid = false;
        //           //this.alertify.error(error);
        //         });
        // }

        //console.log('editor content is: ', rmsg);
        // if (this.ed.froalaEditor('charCounter.count') < 1) {
        //     this.editorContent = this.editorContent
        //         + '<br><br>Message must be at least 20 characters in length. This will go away with automatic padding.';
        //     return;
        // }
        if (isformvalid) {
        //console.log('emailTo value is: ', this.emailTo);

        this.appRepository.messageDto.to = this.emailTo;
        this.appRepository.messageDto.from = this.appRepository.activeUserLoginName;  // this.emailFrom;
        this.appRepository.messageDto.messageId = 'mid';
        // this.appRepository.messageDto.createdOn = new Date().toDateString();
        // this.appRepository.messageDto.deleteAfter = new Date().toDateString();
        this.appRepository.messageDto.userId = this.appRepository.activeUserId;
        this.appRepository.messageDto.fromUserId = this.appRepository.activeUserId;
       // console.log('email subject content is: ', this.emailSubject);
        this.appRepository.messageDto.subject = this.emailSubject;

        //console.log('form values are: ', this.appRepository.messageDto);
        this.apiPath = this.appRepository.getApiBasePath() + 'hypertext/l1/do';
        //this.apiPath = 'http://localhost:5445/dex/hypertext/l1/do';
        this.appRepository.doEncrypt(rmsg, this.apiPath)
            .subscribe((data: MessageDto) => {
                //this.editorContent = data.message; // updates secure editor
               // this.appRepository.isText = false;
                this.editorContent = '';
                this.emailTo = '';
                this.emailSubject = '';
                this.isMsgText = true;
                this.ed.froalaEditor('edit.on');
                this.alertify.success('ARMORED A-Mail Sent Successfully!');
                //this.ed.froalaEditor('events.focus');
                //this.ed.focus();
                //this.appRepository.messageDto.messageId = data.messageId;
               // this.ed.froalaEditor('edit.off');
            }, () => { this.editorContent = 'Not authorized to encrypt text, please login first.';
                          this.appRepository.isText = true;
                          this.isMsgText = true;
                          this.alertify.error('ARMORED A-Mail failed...try again.');
                        });
                // () => {
                //     this.appRepository.doGet('http://localhost:5445/dex/hypertext/l1/getbymsgid/keep/'
                // + this.appRepository.messageDto.messageId) // updates the email inbox list
                //         .subscribe((data: MessageDto[] ) => {
                //             this.appRepository.messages = data;
                //             this.messages = this.appRepository.messages;
                //             // console.log('content of messages is: ', this.messages);
                //         }, (error) => { console.log('doGet failed', error); });
                // });

        }
    }

    doDecrypt() {
        this.apiPath = this.appRepository.getApiBasePath() + 'hypertext/l1/getbymsgid/undo/';
        //this.apiPath = 'http://localhost:5445/dex/hypertext/l1/getbymsgid/undo/';
        //console.log('row selected msgid is: ', this.emailMsgId);
        // this.appRepository.doDecrypt(this.ed.froalaEditor(this.edContentGet), this.apiPath)
        this.appRepository.doDecrypt(this.emailMsgId, this.apiPath)
            .subscribe((data: MessageDto) => {
                //console.log('last row selected', this.lastRowSelected);
               // console.log('MessageDto back from server is: ', data);
                this.editorContent = data.message; // updates the secure editor
                this.emailUser = data.userId;
                this.emailMsgId = data.messageId;
                this.emailTo = data.to;
                this.emailToUserId = data.toUserId;
                this.emailSubject = data.subject;
                this.emailFrom = data.from;
                this.emailFromUserId = data.from;
                this.emailFrom = data.fromUserId;
                this.isMsgText = true;

                this.appRepository.isText = true;
                this.ed.froalaEditor('edit.on');
            }, () => { this.editorContent = 'No longer available, previously decrypted';  this.appRepository.isText = false; },
                () => {
                    //.log('before get touserid is: ', this.emailToUserId);
                    this.appRepository.doGet(this.appRepository.getApiBasePath() + 'hypertext/l1/getbytouserid/keep/'
                     + this.emailToUserId)  // updates the email inbox list
                        .subscribe((data: MessageDto[] ) => {
                            this.appRepository.messages = data;
                            this.messages = data; // this.appRepository.messages;
                            for (let i = 0; i < this.messages.length; i++) {
                                this.messages[i].createdOn = moment(this.messages[i].createdOn).format('MM/DD/YYYY');
                            }
                            //console.log('content of messages is: ', this.messages);
                            //console.log('touserid is: ', this.emailToUserId);

                        }, (error) => {
                            this.appRepository.messages = [];
                            this.messages = []; // this.appRepository.messages;
                            this.isMsgText = false;
                            this.ed.froalaEditor('edit.off');
                           // console.log('doGet failed', error);
                        });
                });
    }
}

// this.appRepository.messageDto.messageId = 'messageid';
// this.appRepository.messageDto.createdOn = new Date().toDateString();
// this.appRepository.messageDto.deleteAfter = new Date().toDateString();
//
// // const dhold = new Date();
// // this.appRepository.messageDto.deleteAfter = dhold.setDate(dhold.getDate() + 15).toString();
// this.appRepository.messageDto.subject = this.emailSubject;
// this.appRepository.messageDto.to = this.emailTo;

