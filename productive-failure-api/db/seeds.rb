# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

patterns = Pattern.create(
    [
        {
            pattern: "circle-triangle-square-square-circle-triangle-square-square-circle-triangle-square-square"
        }, {
            pattern: "square-circle-triangle-square-circle-triangle-square-circle-triangle-square"
        }, {
            pattern: "circle-circle-triangle-square-circle-circle-triangle-square-circle-circle-triangle-square"
        }, {
            pattern: "circle-square-triangle-circle-square-triangle-circle-square-triangle-triangle"
        }
    ]
)
