import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AppRepositoryService } from '../services/apprepository.service';
// import {AppRepositoryService, MessageDto} from './services/app-repository.service';
//import { forEach } from '@angular/router/src/utils/collection';
import { MessageService } from 'primeng/components/common/messageservice';
import { Message, MenuItem } from 'primeng/primeng';
//import { FormControl } from '@angular/forms';
import { DataTable } from 'primeng/primeng';
import { AlertifyService } from '../services/alertify.service';
import { Contact } from '../services/models/contact';
import * as moment from 'moment';
import { CMessageDto } from '../services/models/cmessage';

declare var $: any;

@Component({
  selector: 'app-cloaked-message',
  templateUrl: './cloaked-message.component.html',
  styleUrls: ['./cloaked-message.component.scss']
})
export class CloakedMessageComponent implements OnInit, AfterViewInit {
  // msgGrowls: Message[] = [];
  items: MenuItem[];
  autoCompleteContacts: string[] = [];
  autoCompleteContact: string;
  activeUserContacts: Contact[];
  cmessageDto: CMessageDto;
  cmessages: CMessageDto[];
  rowsSelected: Array<CMessageDto>;
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
  constructor(
    public appRepository: AppRepositoryService,
    private messageSvc: MessageService,
    private alertify: AlertifyService
  ) {}

  options: Object = {
    key: 'WC7A5D4A4fG3A7A7C7A3B3C2G3C2F2ybeiB-11gdB-7A3c1jd==',
    charCounterCount: true,
    toolbarButtons: [
      'fontFamily',
      'fontSize',
      'color',
      'bold',
      'italic',
      'underline',
      'strikeThrough',
      'subscript',
      'superscript',
      'align',
      'outdent',
      'indent',
      'paragraphFormat',
      'insertHR',
      'clearFormatting',
      'undo',
      'redo',
      'emoticons',
      'print',
      'spellChecker',
      '|',
      'clear'
    ],
    toolbarButtonsXS: [
      'bold',
      'italic',
      'underline',
      'strikeThrough',
      'fontSize',
      'alert',
      'paragraphFormat'
    ],
    toolbarButtonsSM: [
      'bold',
      'italic',
      'underline',
      'strikeThrough',
      'fontSize',
      'alert',
      'paragraphFormat'
    ],
    toolbarButtonsMD: [
      'bold',
      'italic',
      'underline',
      'strikeThrough',
      'fontSize',
      'alert',
      'paragraphFormat'
    ],
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
      extra_liners:
        '["h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "pre", "ul", "ol", "table", "dl"]',
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
    //this.editorCloakedContent = this.rowsSelected[0].cmessage;
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


    $.FroalaEditor.DefineIcon('clear', { NAME: 'ban' });
    $.FroalaEditor.RegisterCommand('clear', {
      title: 'Clear (erase and start over)',
      focus: false,
      undo: true,
      refreshAfterCallback: true,
      callback: function() {
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

    // NOTE: needs to be moved to emailRespository.getFor('userid') & returns all encrypted emails.
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
    this.ed.on(
      'froalaEditor.commands.after',
      (e, editor, cmd, param1, param2) => {
        //console.log('command is: ', cmd);
        if (cmd === 'save') {
          this.doCEncrypt();
        }
        if (cmd === 'clear') {
          this.isMsgText = true;
          this.emailTo = '';
          this.emailSubject = '';
          this.ed.froalaEditor('edit.on');
        }
      }
    );

    this.items = [
      {
        label: 'Create New Message',
        icon: 'fa-refresh',
        command: () => {
          this.doCreateNewMsg();
          this.isMsgText = true;
          this.ed.froalaEditor('edit.on');
          //this.alertify.message('Create New Message');
        }
      },
      {
        label: 'Archive',
        icon: 'fa-close',
        command: () => {
          this.alertify.message('Archive');
          this.isMsgText = true;
          this.ed.froalaEditor('edit.on');
        }
      },
      {
        label: 'Save Local',
        icon: 'fa-close',
        command: () => {
          this.alertify.message('Save Local');
          this.isMsgText = true;
          this.ed.froalaEditor('edit.on');
        }
      },
      {
        label: 'Delete',
        icon: 'fa-close',
        command: () => {
          this.alertify.message('delete');
          this.isMsgText = true;
          this.ed.froalaEditor('edit.on');
        }
      }
    ];

    this.isMsgText = true;
    this.ed.froalaEditor('edit.on');
    this.emailTo = '';

    //   this.ed.froalaEditor({
    //     width: '490',
    //     height: '350'
    //   });
    this.cmessageDto = {
        messageId: '',
        message: '',
        cMessage: '',
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
        groupId: '',
        sCode: '',
        rid: ''
      };


    this.doGetContacts();
  }

  doGetCloakedTxt() {
    console.log('in doGetCloakedTxt, cmessage is: ', this.cmessageDto.cMessage);
    this.cmessageDto.message = this.ed.froalaEditor(this.edContentGet);
    this.editorContent = '';
    this.editorContent = this.cmessageDto.cMessage;
    console.log('in doGetCloakedTxt after assignment, cmessage is: ', this.cmessageDto.cMessage);
  }

  doGetMsgTxt() {
    this.cmessageDto.cMessage = this.ed.froalaEditor(this.edContentGet);
    this.editorContent = '';
    this.editorContent = this.cmessageDto.message;
  }

  ngAfterViewInit() {
    this.appRepository
      .doCGet(
        this.appRepository.getApiBasePath() +
          'cloak/l1/getbytouserid/keep/' +
          this.appRepository.activeUserId
      ) // updates the email inbox list
      .subscribe((data: CMessageDto[]) => {
        this.cmessages = data;
        for (let i = 0; i < this.cmessages.length; i++) {
          this.cmessages[i].createdOn = moment(
            this.cmessages[i].createdOn
          ).format('MM/DD/YYYY');
        }
        this.isMsgText = true;
        this.ed.froalaEditor('edit.on');
      });
  }

  doEditCompleted(editInfo) {
    const fieldChanged = editInfo.column.field;
    const newRowValues = editInfo.data;
  }

  doCreateNewMsg() {
    this.editorContent = '';
    //this.ctxt = '';
    this.emailSubject = '';
    this.emailTo = '';
    this.ed.froalaEditor('edit.on');
    this.isMsgText = true;
  }

  doGetContacts() {
    this.appRepository.getContacts().subscribe(
      (contacts: Contact[]) => {
        this.activeUserContacts = contacts;
      },
      error => {
        console.log(error);
      }
    );
  }

  getFilteredContacts(event) {
    let query = event.query;
    for (let i = 0; i < this.activeUserContacts.length; i++) {
      this.autoCompleteContacts[i] = this.activeUserContacts[i].amailAddr;
    }
    this.autoCompleteContacts = this.filterContacts(
      query,
      this.autoCompleteContacts
    );
  }

  filterContacts(query, contacts: string[]): string[] {
    let filtered: string[] = [];
    for (let i = 0; i < contacts.length; i++) {
      let contact = contacts[i];
      if (contact.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        filtered.push(contact);
      }
    }
    return filtered;
  }

  doSelectCText() {
   //this.alertify.error('Not available yet, coming soon!');
   this.alertify.dialog(
    'Got It!',
    '<h5>This feature is coming soon!<h5>'
  );
  }

  doCEncrypt() {
    let isformvalid: boolean;
    isformvalid = true;
    //TODO: need validation that emailto exists
    //console.log('emailto value is: ', this.emailTo);
    if (this.emailTo === 'undefined' || this.emailTo === '') {
      this.alertify.error('EmailTo field: must have a value.');
      isformvalid = false;
    }
    if (this.cmessageDto.cMessage === '') {
      this.alertify.error('Cloaking text must have a value.');
      isformvalid = false;
    }

    if (this.cmessageDto.cMessage.length < this.cmessageDto.message.length) {
      this.alertify.error('Cloaking text must be longer then the message text. Please add more cloaking text.');
      isformvalid = false;
    }


    let rmsg =  this.cmessageDto.message; //this.ed.froalaEditor(this.edContentGet);
    // console.log('editor content is: ', rmsg);
    rmsg = rmsg.replace(/&nbsp;/gi, '');
    rmsg = rmsg.trim();
    if (rmsg.length === 0) {
      //this.alertify.error('Message must contain at least one character.');
      this.alertify.dialog(
        'Got It!',
        '<h4>There is nothing to send or encrypt!<h4>'
      );
      isformvalid = false;
    }

    if (
      this.emailTo === 'undefined' ||
      this.emailTo === null ||
      this.emailTo.length === 0
    ) {
      this.alertify.dialog(
        'Got It!',
        '<h4>The mail-To field is empty. You must have a Mail-To address.<h4>'
      );
    }

    let isFound = false;
    for (let i = 0; i < this.activeUserContacts.length; i++) {
      if (this.activeUserContacts[i].amailAddr === this.emailTo) {
        isFound = true;
      }
    }
    if (isformvalid) {
      this.cmessageDto.to = this.emailTo;
      this.cmessageDto.from = this.appRepository.activeUserLoginName; // this.emailFrom;
      this.cmessageDto.messageId = 'mid';
      this.cmessageDto.userId = this.appRepository.activeUserId;
      this.cmessageDto.fromUserId = this.appRepository.activeUserId;
      this.cmessageDto.subject = this.emailSubject;
      this.apiPath = this.appRepository.getApiBasePath() + 'cloak/l1/do';
      this.appRepository.doCEncrypt(this.cmessageDto, this.apiPath).subscribe(
        (data: CMessageDto) => {
          this.editorContent = '';
          this.emailTo = '';
          this.emailSubject = '';
          this.isMsgText = true;
          this.ed.froalaEditor('edit.on');
          this.alertify.success('ARMORED C-Mail Sent Successfully!');
        },
        () => {
          this.editorContent =
            'Not authorized to encrypt text, please login first.';
          this.appRepository.isText = true;
          this.isMsgText = true;
          this.alertify.error('ARMORED C-Mail failed...try again.');
        }
      );
    }
  }

  doCDecrypt() {
    this.apiPath =
      this.appRepository.getApiBasePath() + 'cloak/l1/getbymsgid/undo/';
    this.appRepository.doCDecrypt(this.emailMsgId, this.apiPath).subscribe(
      (data: CMessageDto) => {
        console.log('in doCDecrypt response is: ', data);
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
        this.cmessageDto.cMessage = data.cMessage;
        this.cmessageDto.message = data.message;
        this.appRepository.isText = true;
        this.ed.froalaEditor('edit.on');
        console.log('in doCDecrypt response cmessageDto.cmessage is: ', this.cmessageDto.cMessage);
        console.log('in doCDecrypt response cmessageDto.message is: ', this.cmessageDto.message);
      },
      () => {
        this.editorContent = 'No longer available, previously decrypted';
        this.appRepository.isText = false;
      },
      () => {
        //.log('before get touserid is: ', this.emailToUserId);
        this.appRepository
          .doGet(
            this.appRepository.getApiBasePath() +
              'hypertext/l1/getbytouserid/keep/' +
              this.emailToUserId
          ) // updates the email inbox list
          .subscribe(
            (data: CMessageDto[]) => {
              this.appRepository.messages = data;
              this.cmessages = data; // this.appRepository.messages;
              for (let i = 0; i < this.cmessages.length; i++) {
                this.cmessages[i].createdOn = moment(
                  this.cmessages[i].createdOn
                ).format('MM/DD/YYYY');
              }
              //console.log('content of messages is: ', this.messages);
              //console.log('touserid is: ', this.emailToUserId);
            },
            error => {
              this.cmessages = []; // this.appRepository.messages;
              this.isMsgText = false;
              this.ed.froalaEditor('edit.off');
              // console.log('doGet failed', error);
            }
          );
      }
    );
  }
}
