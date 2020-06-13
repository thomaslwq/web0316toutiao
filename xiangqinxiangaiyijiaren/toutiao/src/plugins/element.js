import Vue from 'vue'
import {
    Button,
    Message,
    MessageBox,
    Notification,
    Loading,
    Input,
    FormItem,
    Form,
    Select,
    Option,
    Col,
    DatePicker,
    Switch,
    Checkbox,
    CheckboxGroup,
    Radio,
    RadioGroup,
    TimePicker,
    Container,
    Header,
    Main,
    Aside,
    Image,
    ButtonGroup,
    Row,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    TabPane,
    Tabs,
    Popover,
    Upload,
    Autocomplete
} from 'element-ui'
Vue.use(Container)
.use(Autocomplete)
.use(Popover)
.use(Upload)
.use(Dropdown)
.use(TabPane)
.use(Tabs)
.use(DropdownMenu)
.use(DropdownItem)
.use(Header)
.use(Row)
.use(ButtonGroup)
.use(Image)
.use(Aside)
.use(Main)
.use(TimePicker)
.use(Form)
.use(Input)
.use(Button)
.use(FormItem)
.use(Select)
.use(Option)
.use(Col)
.use(DatePicker)
.use(Switch)
.use(Checkbox)
.use(CheckboxGroup)
.use(Radio)
.use(RadioGroup)
Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;