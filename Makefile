REPORTER = spec
test-coveralls:
    babel-node ./node_modules/istanbul/lib/cli cover \
    node_modules/mocha/bin/_mocha -- --bail --recursive test/.setup.js test/**/*.test.js && \
        cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js --verbose