# preload.js
Preload images of a website to improve user experience.

## Usage
Simply copy the contect in preload.js for the main code. To preload an image,
```js
preload('image_to_load.jpg', CallBack_Function);
```
Instead of a single image, we can load multiple images by creating an array.
```js
let Images_to_load = ['image_1.jpg', 'image_2.jpg', 'image_3.jpg']
preload(Images_to_load, CallBack_Function);
```

### CallBack function
Once the each image finished loading, the callback function is called. It will provide three parameters with it.
- **url**, the url of currently loaded image.
- **progress**, If you asked multiple images to preload, this parameter will give how many images have loaded as a percentage.
- **status**, will send "pass" if image loaded sucessfully, and "error" if not.

```js
function CallBack_Function(url, progress, status){
  //code...
}

preload(Images_to_load, CallBack_Function);
```
