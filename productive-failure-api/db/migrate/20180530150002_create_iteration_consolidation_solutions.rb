class CreateIterationConsolidationSolutions < ActiveRecord::Migration[5.1]
  def change
    create_table :iteration_consolidation_solutions do |t|
      t.string :productive_failure_id
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
