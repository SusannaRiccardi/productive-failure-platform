class CreateRepresentations < ActiveRecord::Migration[5.1]
  def change
    create_table :representations do |t|
      t.string :constraint
      t.string :svg
      t.string :productive_failure_id

      t.timestamps
    end
  end
end
