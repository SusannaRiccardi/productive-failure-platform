class CreateActivityPatterns < ActiveRecord::Migration[5.1]
  def change
    create_table :activity_patterns do |t|
      t.string :productive_failure_id
      t.string :pattern_id

      t.timestamps
    end
  end
end
