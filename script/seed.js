'use strict'

const db = require('../server/db')
const { User, Entry, Prompt } = require('../server/db/models')

async function seed() {
  await db.sync({ force: true })
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      firstName: 'Jonathan',
      lastName: 'Arreola',
      email: 'user@email.com',
      password: '123',
      isAdmin: true
    }),
    User.create({
      firstName: 'Jasmine',
      lastName: 'Wang',
      email: 'user2@email.com',
      password: '123'
    })
  ])

  const prompts = await Promise.all([
    Prompt.create({
      subject: `Colors`,
      details: `What is your favorite color?
                Why?
                What other colors make you feel happy?
                Why?
                What colors do you not like?
                Why?`
    }),
    Prompt.create({
      subject: `Changes`,
      details: `What is the biggest change you have made in your life so far?
                Why did you make it?
                Why is it the most important change you've ever made?`
    }),
    Prompt.create({
      subject: `Advice`,
      details: `What advice would you give to a random kid who just asked you about life?
                Why?
                Do you think you follow that advice?
                Why?`
    }),
    Prompt.create({
      subject: `Your Best Traits`,
      details: `What do you think are your best traits?
                Why?
                Were those questions easy for you to answer?
                Why or why not?`
    }),
    Prompt.create({
      subject: `Your Past`,
      details: `What makes you feel good about your past? Why?`
    }),
    Prompt.create({
      subject: `Memories of a Friend`,
      details: `Share a memory about you and a childhood friend.
                Is this memory worth holding onto?
                Why or why not?`
    }),
    Prompt.create({
      subject: `Week 1 - Check in`,
      details: `How do you feel after completing this week of journaling?
                What was the most helpful prompt from this week and why?`
    })
  ])

  const entries = await Promise.all([
    Entry.create({
      userId: 1,
      title: 'Entry Title 1',
      content: 'my first entry'
    }),
    Entry.create({
      userId: 1,
      title: 'Entry Title 2',
      content: 'my second entry'
    }),
    Entry.create({
      userId: 2,
      title: 'Entry 1',
      content: 'first entry'
    }),
    Entry.create({
      userId: 2,
      title: 'Entry 2',
      content: 'second etnry'
    })
  ])

  //SEED REPORT
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${entries.length} entries`)
  console.log(`seeded ${prompts.length} prompts`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
