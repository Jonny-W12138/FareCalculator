import { createApp } from 'vue'
import App from './App.vue'
import {
    Button,Field, CellGroup,Picker,Toast,Dialog
} from 'vant';
import 'vant/lib/index.css';
createApp(App).use(Field).use(CellGroup).use(Button).use(Picker).use(Toast).use(Dialog).mount('#app')
