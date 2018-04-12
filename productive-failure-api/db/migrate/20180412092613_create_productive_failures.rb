class CreateProductiveFailures < ActiveRecord::Migration[5.1]
  def change
    create_table :productive_failures do |t|
      t.string :generation_two_id
      t.string :owner_id

      t.timestamps
    end
  end
end
