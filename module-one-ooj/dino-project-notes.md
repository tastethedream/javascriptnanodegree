# Object Oriented JavaScript - Dino Project

## Task 1
### when 'compare me' button is clicked 
### create human object from values input into the user input form
### Hide the form

![Task 1 Flow Chart](https://github.com/tastethedream/javascriptnanodegree/blob/master/images/dinotask1.svg "Dino Task 1")

```
graph LR
  user[Form] -->|User interaction| button{Button}
  button -->|onClick| form[Hide Form]
  button -->|onClick| object[Create JS Object]
	object -->|Human object| function	
```
### Task one complete

![Task 1 Flow Chart complete](https://github.com/tastethedream/javascriptnanodegree/blob/master/images/task1complete.png "Dino Task 1 complete")


## Task 2
### Compare the properties of the Dino objects with those of the Human object
### Create new facts based on the comparison
### push these facts to factArray
### display factArray

```
graph LR
  humanO[Human Object]
  dinoO[Dino Object]
  humanO-->|properties| Compare{Compare}
  dinoO --> |properties|Compare{Compare}
  Compare -->| Method One| height[height]
  Compare -->| Method Two| weight[weight]
  Compare -->|Method Three| diet[diet]
  height -->| calc dino height/human height| heightFact[New Dino height Fact]
  weight -->| calc dino height/human height| weightFact[New Dino weight Fact]
  diet -->dietcompare{dietCompare}
  dietcompare -->| if dino diet equal to human diet| dietFact[New Dino diet Fact]
  dietcompare -->| if dino diet is not equal to human diet| nonewfact[use original diet Fact]
	heightFact -->|push new fact|dinoarray[dino array]
  weightFact -->|push new fact|dinoarray[dino array]
  dietFact -->|push new fact|dinoarray[dino array]
  ```
  ![Task 2 Flow Chart ](https://github.com/tastethedream/javascriptnanodegree/blob/master/images/task2.png "Dino Task 2")