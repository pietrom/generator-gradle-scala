package <%= groupId %>

import junit._

class HelloTest {
	@Test
	def shouldSayHelloWorld : Unit = {
		val sut = new Hello()
		Assert.assertEquals("Hello, World!", sut.sayHello())
	}
}