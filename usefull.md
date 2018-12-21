<!-- class="needsclick" fastclick Don't block the click process -->
<!-- @load="loadImage" carousel render too late cause height wrong -->
<img class="needsclick" :src="item.picUrl" @load="loadImage"/>
