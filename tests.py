from datetime import datetime, timedelta
import unittest
from server import app, db, User, Recipe, Ingredient

class ModelCases(unittest.TestCase):
    def setUp(self):
        app.config['SQLALCHEMY_DATABASE_URI']= 'sqlite://'
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def test_assosiations(self):
        u1=User(username="testaaja", email='testaaja@testi.fi')
        db.session.add(u1)
        db.session.commit()
        self.assertEqual(u1.username, "testaaja")

        i1= Ingredient(name="testiaines1", amount=200, unit="g")
        db.session.add(i1)
        db.session.commit()
        self.assertEqual(i1.name, "testiaines1")
        self.assertEqual(i1.amount, 200)
        self.assertEqual(i1.unit, "g")

        recipe= Recipe(name="testiresepti1", user_id=u1.id)
        db.session.add(recipe)
        db.session.commit()
        self.assertEqual(recipe.name, "testiresepti1")

        test_recipe = Recipe.query.get(1)
        ingredient = Ingredient.query.get(1)
        test_recipe.ingredients.append(ingredient)
        db.session.commit()
        print(str(test_recipe.ingredients[0]))

        print(str(ingredient.recipe[0]))


if __name__ == '__main__':
    unittest.main(verbosity=2)
