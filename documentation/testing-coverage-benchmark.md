## Testing, coverage and benchmark

* `npm test` or `gulp mocha` - run tests
* `gulp cover` - check tests coverage
* `gulp benchmark` - rum performance test
 
## Code coverage

* Statements   : 100% ( 79/79 )
* Branches     : 97.06% ( 33/34 )
* Functions    : 100% ( 16/16 )
* Lines        : 100% ( 79/79 )


|:------------------------|:-------------:|:-------------:|:------------:|:-------------:|
| File                    | Statements    | Branches      | Functions    | Lines         |
|========================:|==============:|==============:|=============:|==============:|
|      config-manager.js  | 100% (102/102)| 97.73% (43/44)| 100% (18/18) | 100% (102/102)|



|-------------------------|
|Statements|100% ( 79/79 )|
|Branches|97.06% ( 33/34 )|
|Functions|100% ( 16/16 )|
|Lines|100% ( 79/79 )|
|--------------------|

## Performance test

* Get simple key ...................... x 6,209,118 ops/sec +0.22%
* Get deep key ........................ x 5,184,231 ops/sec +0.20%
* Get key with reference .............. x 1,444,284 ops/sec +0.06%
* Get key with reference and template . x 123,193 ops/sec +0.82%
* Set simple key ...................... x 4,641,383 ops/sec +0.62%
* Set deep key ........................ x 2,377,595 ops/sec +0.24%
