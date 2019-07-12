# Neocles Assignment

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.2.

1. Rendering the page takes some time. That's OK, but then, whenever you start typing into the filter box,
that's also really slow. Try to find a way to make that faster.

2. Make the whole component more reactive using RxJS. Hints: AsyncPipe, ReactiveForms.

3. Implement a pager, so that you can see other result pages than just the first one.

4. I want to be able to enter multiple words (separated by space), and get all entries that contain (parts of) all
of those words. Change the filter function so that this works correctly.

5. Apply any other improvements you can think of.

## Branches

**Master**: The exercise that I sent last week.  

**fix/test-improvements**: The improved exercise.


## Notes

1. The rendering is much better now, this is because I'm treating the input value as an observable and I've applied some RXJS operators to debounce the calls to the function, and because some other operators like distinctUntilChanged are being used when piping the search term. The ngFor is making use of trackby, which enhances the rendering time.

** Important!: ** After sending the exam, today (Monday morning), I've implemented a significant improvement to the filterResults method. Even when there are many things that can be still done, I wouldn't like to skip this one.

2. I've converted the input into a FormControl, but I didn't find any good reason to convert the data array into an observable, and render it with the asyncpipe.

3. A pager has been implemented, its implementation is really basic. I've considered only the initial case (Max pages that can be created = 10000 / page size), more cases need to be considered, such as the total amount of pages that can be generated when displaying search results.

4. Once again, I've implemented a basic solution: I'm creating an array from the search terms (Even if it's only one word) and then based on the elements that I got, I run the method that returns results by search term, once per element, and I'm merging all the results into a single array. The solution is not elegant, but it works, and can -and should- be improved.

5. Improvements: Many, but because of the time limit, I was not able to introduce them.

  - Moving the data generation routine to a service.
  - Better code structuring (for instance, removing all the unnecessary code from the ngFor statement)
  - TESTS
  - To create the pager directive instead of implementing it in the component.
  - To implement Angular Material and the prebuilt Table component. (Which includes paging and sorting)
  - Implementing Styles.
  - Documenting the code
  - Many more, I'm sure.
