var supertest = require("supertest");

var should = require("should");

var server = supertest.agent("http://localhost:8080");

describe("SAMPLE unit test",function(){
    
    it("should return home page",function(done){
        
        server
            .get("/")
            .expect("Content-type",/json/)
            .expect(200) // THis is HTTP response
            .end(function(err,res){
                // HTTP status should be 200
                res.status.should.be.equal(200);
                // Error key should be false.
                done();
            });
    });

});

describe("SAMPLE unit test",function(){

    it("should return page with films",function(done){
        
        server
            .get("/films")
            .expect("Content-type",/json/)
            .expect(200) 
            .end(function(err,res){
                res.status.should.be.equal(200);
                done();
            });
    });

});

describe("SAMPLE unit test",function(){

    it("should return page with books",function(done){
        server
            .get("/books")
            .expect("Content-type",/json/)
            .expect(200)
            .end(function(err,res){
                res.status.should.be.equal(200);
                done();
            });
    });

});

describe("SAMPLE unit test",function(){

    it("should return page with film description",function(done){
        server
            .get("/filmReviews")
            .expect("Content-type",/json/)
            .expect(200)
            .end(function(err,res){
                res.status.should.be.equal(200);
                done();
            });
    });

});

describe("SAMPLE unit test",function(){

    it("should return page to add review ",function(done){
        server
            .get("/addfilmreview")
            .expect("Content-type",/json/)
            .expect(200)
            .end(function(err,res){
                res.status.should.be.equal(200);
                done();
            });
    });

});

describe("SAMPLE unit test",function(){

    it("should return json",function(done){
        server
            .post("/result")
            .send ({text: "fgefghe", scope: Math.floor(Math.random() * (5 - 1 + 1)) + 1})
            .expect("Content-type",/json/)
            .expect(200)
            .end(function(err,res){
                res.status.should.be.equal(200);
                done();
            });
    });
});