import { AfterViewInit, Component, OnInit } from "@angular/core";
import { AppRepositoryService } from "../services/apprepository.service";
import { MessageDto } from "../services/models/messageDto";
import { forEach } from "@angular/router/src/utils/collection";
import { MessageService } from "primeng/components/common/messageservice";
import { Message, MenuItem } from "primeng/primeng";
import { FormControl } from "@angular/forms";
import { DataTable } from "primeng/primeng";
import { AlertifyService } from "../services/alertify.service";
import { Contact } from "../services/models/contact";
import * as moment from "moment";

declare var $: any;

@Component({
  selector: "app-message",
  templateUrl: "./message.component.html",
  styleUrls: ["./message.component.scss"],
})
export class MessageComponent implements OnInit, AfterViewInit {
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
  isFound: boolean;
  dialogVisible: boolean;

  constructor(
    public appRepository: AppRepositoryService,
    private messageSvc: MessageService,
    private alertify: AlertifyService
  ) {}

  options: Object = {
    key: "WC7A5D4A4fG3A7A7C7A3B3C2G3C2F2ybeiB-11gdB-7A3c1jd==",
    charCounterCount: true,
    toolbarButtons: [
      "fontFamily",
      "fontSize",
      "color",
      "bold",
      "italic",
      "underline",
      "strikeThrough",
      "subscript",
      "superscript",
      "align",
      "outdent",
      "indent",
      "paragraphFormat",
      "insertHR",
      "clearFormatting",
      "undo",
      "redo",
      "emoticons",
      "spellChecker",
      "|",
      "clear",
    ],
    toolbarButtonsXS: [],
    // toolbarButtonsXS: ['bold', 'italic', 'underline', 'strikeThrough',
    //     'fontSize', 'alert', 'paragraphFormat'],
    toolbarButtonsSM: [
      "bold",
      "italic",
      "underline",
      "strikeThrough",
      "fontSize",
      "alert",
      "paragraphFormat",
    ],
    toolbarButtonsMD: [
      "bold",
      "italic",
      "underline",
      "strikeThrough",
      "fontSize",
      "alert",
      "paragraphFormat",
    ],
    quickInsertButtons: ["image", "table"],
    height: 328,
    fontSizeDefaultSelection: "14",
    placeholderText: "PRIVATIZE yourself, start typing here...",
    saveInterval: 0,
    pastePlain: true,
    htmlRemoveTags: ["script"],
    htmlExecuteScripts: false,
    enter: $.FroalaEditor.ENTER_BR,
    codeBeautifierOptions: {
      end_with_newline: true,
      indent_inner_html: true,
      extra_liners:
        '["h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "pre", "ul", "ol", "table", "dl"]',
      brace_style: "expand",
      indent_char: " ",
      indent_size: 4,
      wrap_line_length: 0,
    },
  };

  onRowSelected(lastRow) {
    this.editorContent = this.rowsSelected[0].message;
    this.emailUser = this.rowsSelected[0].userId;
    this.emailMsgId = this.rowsSelected[0].messageId;
    this.emailTo = this.rowsSelected[0].to;
    this.emailSubject = this.rowsSelected[0].subject;
    this.emailFrom = this.rowsSelected[0].from;
    this.lastRowSelected = lastRow;
    this.emailId = this.rowsSelected[0].emailId;
    this.isMsgText = false;
    this.ed.froalaEditor("edit.off");
  }

  ngOnInit() {
    $.FroalaEditor.DefineIcon("clear", { NAME: "ban" });
    $.FroalaEditor.RegisterCommand("clear", {
      title: "Clear (erase and start over)",
      focus: false,
      undo: true,
      refreshAfterCallback: true,
      callback: function () {
        this.html.set("");
        //this.apprepository.isText = true;
        this.events.focus();
      },
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

    this.edContentGet = "html.get";
    this.ed = $("div#fred");

    this.appRepository.isText = true;
    this.ed.on(
      "froalaEditor.commands.after",
      (e, editor, cmd, param1, param2) => {
        if (cmd === "save") {
          this.doEncrypt();
        }
        if (cmd === "clear") {
          this.isMsgText = true;
          this.emailTo = "";
          this.emailSubject = "";
          this.ed.froalaEditor("edit.on");
        }
      }
    );

    this.items = [
      {
        label: "Create New Message",
        icon: "fa-refresh",
        command: () => {
          this.doCreateNewMsg();
          this.isMsgText = true;
          this.ed.froalaEditor("edit.on");
        },
      },
      // {label: 'Sent', icon: 'fa-close', command: () => {
      //     //this.alertify.message('Sent');
      //     this.isMsgText = true;
      //     this.ed.froalaEditor('edit.on');
      // }},
      // {label: 'Save Local', icon: 'fa-close', command: () => {
      //     this.alertify.message('Save Local');
      //     this.isMsgText = true;
      //     this.ed.froalaEditor('edit.on');
      // }},
      {
        label: "Delete",
        icon: "fa-close",
        command: () => {
          //this.alertify.message('delete');
          this.isMsgText = true;
          this.ed.froalaEditor("edit.on");
          this.deleteMsg();
        },
      },
    ];

    this.isMsgText = true;
    this.ed.froalaEditor("edit.on");
    this.emailTo = "";

    this.doGetContacts();
  }

  ngAfterViewInit() {
    this.appRepository
      .doGet(
        this.appRepository.getApiBasePath() +
          "hypertext/l1/getbytouserid/keep/" +
          this.appRepository.activeUserId
      ) // updates the email inbox list
      .subscribe((data: MessageDto[]) => {
        console.log("ngAfterViewInit: ", data);
        if (data != null) {
          this.appRepository.messages = data;
          for (let i = 0; i < this.appRepository.messages.length; i++) {
            this.appRepository.messages[i].createdOn = moment(
              this.appRepository.messages[i].createdOn
            ).format("MM/DD/YYYY");
          }
        }
        this.messages = this.appRepository.messages;
        this.isMsgText = true;
        this.ed.froalaEditor("edit.on");
      });
  }

  doEditCompleted(editInfo) {
    const fieldChanged = editInfo.column.field;
    const newRowValues = editInfo.data;
  }

  addNew() {
    this.doCreateNewMsg();
  }

  deleteMsg() {
    this.dialogVisible = true;
  }

  btnDelete() {
    this.dialogVisible = false;
    this.appRepository.deleteMsg(this.emailMsgId).subscribe((data) => {
      this.ngAfterViewInit();
    });
    this.doCreateNewMsg();
  }

  btnCancel() {
    this.dialogVisible = false;
    //this.doCreateNewLogEntry();
  }

  doCreateNewMsg() {
    this.editorContent = "";
    this.emailSubject = "";
    this.emailTo = "";
    this.ed.froalaEditor("edit.on");
    this.isMsgText = true;
  }

  doGetContacts() {
    this.appRepository.getContacts().subscribe(
      (contacts: Contact[]) => {
        this.activeUserContacts = contacts;
      },
      (error) => {
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

  // doVerifyAmailAddr() {
  //     this.appRepository.getUserByAmailAddr(this.emailTo)
  //       .subscribe((value: string) => {
  //       if (Number(value) !== 200) {
  //          this.alertify.dialog('Ok', '<h4>The <b>Mail To:</b> address does not exist and is not a valid destination.' +
  //             ' Please check your spelling and try again.<h4>');
  //       }
  //     });
  // }

  doEncrypt() {
    if (this.emailTo === "undefined" || this.emailTo === "") {
      this.alertify.dialog("Ok", "EmailTo field: must have a value.");
      return;
    }
    let rmsg = this.ed.froalaEditor(this.edContentGet);
    rmsg = rmsg.replace(/&nbsp;/gi, "");
    rmsg = rmsg.trim();
    if (rmsg.length === 0) {
      this.alertify.dialog(
        "Got It!",
        "<h4>There is nothing to send or encrypt!<h4>"
      );
      return;
    }

    // this.isFound = false;
    // for (let i = 0; i < this.activeUserContacts.length; i++) {
    //     if (this.activeUserContacts[i].amailAddr === this.emailTo) {
    //         this.isFound = true;
    //         }
    // }

    this.appRepository.messageDto.to = this.emailTo;
    this.appRepository.messageDto.from = this.appRepository.activeUserLoginName; // this.emailFrom;
    this.appRepository.messageDto.messageId = "mid";
    this.appRepository.messageDto.userId = this.appRepository.activeUserId;
    this.appRepository.messageDto.fromUserId = this.appRepository.activeUserId;
    this.appRepository.messageDto.subject = this.emailSubject;

    this.apiPath = this.appRepository.getApiBasePath() + "hypertext/l1/do";
    this.appRepository.doEncrypt(rmsg, this.apiPath).subscribe(
      (data: MessageDto) => {
        if (data.message) {
          this.editorContent = "";
          this.emailTo = "";
          this.emailSubject = "";
          this.isMsgText = true;
          this.ed.froalaEditor("edit.on");
          this.alertify.success("ARMORED A-Mail Sent Successfully!");
        } else {
          this.alertify.dialog(
            "Ok",
            "<h4>The <b>Mail To:</b> address does not exist and is not a valid destination." +
              " Please check your spelling and try again.<h4>"
          );
        }
      },
      () => {
        this.editorContent =
          "Not authorized to encrypt text, please login first.";
        this.appRepository.isText = true;
        this.isMsgText = true;
        this.alertify.error("ARMORED A-Mail failed...try again.");
      },
      () => {
        this.ngAfterViewInit();
      }
    );
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

  doDecrypt() {
    this.apiPath =
      this.appRepository.getApiBasePath() + "hypertext/l1/getbymsgid/undo/";
    this.appRepository.doDecrypt(this.emailMsgId, this.apiPath).subscribe(
      (data: MessageDto) => {
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
        this.ed.froalaEditor("edit.on");
      },
      () => {
        this.editorContent = "No longer available, previously decrypted";
        this.appRepository.isText = false;
      },
      () => {
        this.appRepository
          .doGet(
            this.appRepository.getApiBasePath() +
              "hypertext/l1/getbytouserid/keep/" +
              this.emailToUserId
          ) // updates the email inbox list
          .subscribe(
            (data: MessageDto[]) => {
              this.appRepository.messages = data;
              this.messages = data; // this.appRepository.messages;
              for (let i = 0; i < this.messages.length; i++) {
                this.messages[i].createdOn = moment(
                  this.messages[i].createdOn
                ).format("MM/DD/YYYY");
              }
            },
            (error) => {
              this.appRepository.messages = [];
              this.messages = []; // this.appRepository.messages;
              this.isMsgText = false;
              this.ed.froalaEditor("edit.off");
            }
          );
      }
    );
  }
}
