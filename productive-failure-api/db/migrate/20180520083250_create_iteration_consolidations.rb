class CreateIterationConsolidations < ActiveRecord::Migration[5.1]
  def change
    create_table :iteration_consolidations do |t|
      t.string :pattern
      t.string :rep1
      t.string :rep2
      t.string :rep3
      t.string :rep4
      t.string :rep5
      t.string :rep6

      t.timestamps
    end
  end
end
