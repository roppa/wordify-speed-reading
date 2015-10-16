describe('Wordify Angular App', function() {

  beforeEach( function(){
    browser.driver.get('http://localhost:3000?engine=angular');
  });

  it('user can navigate to the angular app', function(){
    expect( browser.driver.getCurrentUrl() ).toContain('angular');
  });

});
