## Testing, coverage and benchmark

* `npm test` or `gulp mocha` - run tests
* `gulp cover` - check tests coverage
* `gulp benchmark` - rum performance test
 
## Code coverage

* Statements   : 100% ( 102/102 )
* Branches     : 97.73% ( 43/44 )
* Functions    : 100% ( 18/18 )
* Lines        : 100% ( 102/102 )

## Performance test

    Get simple key ............................... 4,974,638 ops/sec +1.90% 
    Get deep key ................................. 4,964,297 ops/sec +1.43%
    Get key with reference ....................... 1,348,781 ops/sec +1.09%
    Get key with reference and template .......... 86,857 ops/sec +0.85%
    Get key with deep references ................. 215,264 ops/sec +1.27% (95 runs sampled)
    Get template with deep references ............ 91,008 ops/sec +1.75% (89 runs sampled)
    Set simple key ............................... 2,358,983 ops/sec +1.98% (93 runs sampled)
    Set deep key ................................. 1,866,575 ops/sec +2.70% (93 runs sampled)


    Get simple key ........................ x 6,209,118 ops/sec +0.22%
    Get deep key .......................... x 5,184,231 ops/sec +0.20%
    Get key with reference ................ x 1,444,284 ops/sec +0.06%
    Get key with reference and template ... x 123,193 ops/sec +0.82%
    Set simple key ........................ x 4,641,383 ops/sec +0.62%
    Set deep key .......................... x 2,377,595 ops/sec +0.24%



