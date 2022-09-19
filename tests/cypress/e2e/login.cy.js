import loginPage from '../support/pages/Login'
import mapPage from '../support/pages/Map'



describe('Login', () => {

   beforeEach(()=>{
    cy.fixture('login-users').then(function(users) {
      this.users = users

    })
   })

  it.only('deve logar com sucesso', function () {

    const user = this.users.success
    cy.apiCreateUser(user)
     
    loginPage.go()
    loginPage.form(user)
    loginPage.submit()

    mapPage.loggedUser(user.name)

    
  })
  it('nao deve logar com senha invalida', function() {

    const user = this.users.inv_pass

    loginPage.go()
    loginPage.form(user)
    loginPage.submit()

    loginPage.modal.haveText('Credenciais inválidas, tente novamente!')
    //cy.modalHaveText('Credenciais inválidas, tente novamente!')


  })

  it('nao deve logar com instagram inexistente', () => {
    cy.visit('/')
    cy.get('input[name=instagram]').type('@mte')
    cy.get('input[name=password]').type('maria123')

    cy.contains('button', 'Entrar').click()

    cy.get('.swal2-html-container')
      .should('be.visible')
      .should('have.text', 'Credenciais inválidas, tente novamente!')

  })

  it('instagram deve ser obrigatório', function (){
    const user = this.users.required_insta

    loginPage.go()
    loginPage.form(user)
    loginPage.submit()
    loginPage.modal.haveText('Por favor, informe o seu código do Instagram!')
    
  })

  it('senha deve ser obrigatória', function() {
    const user = this.users.required_pass

    loginPage.go()
    loginPage.form(user)
    loginPage.submit()
    loginPage.modal.haveText('Por favor, informe a sua senha secreta!')
   
  })

  it('todos os campos são obrigatórios', ()=> {
    const user = {}
      
    loginPage.go()
    loginPage.form(user)
    loginPage.submit()
    loginPage.modal.haveText('Por favor, informe suas credenciais!')
   
  })
})


