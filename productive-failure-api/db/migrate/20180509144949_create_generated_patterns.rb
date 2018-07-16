class CreateGeneratedPatterns < ActiveRecord::Migration[5.1]
  def change
    create_table :generated_patterns do |t|
      t.string :reconstruct_pattern_id
      t.string :pattern
      t.string :productive_failure_id

      t.timestamps
    end
  end
end
