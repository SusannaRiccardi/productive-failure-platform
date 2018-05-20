class CreateReconstructPatterns < ActiveRecord::Migration[5.1]
  def change
    create_table :reconstruct_patterns do |t|
      t.string :productive_failure_id
      t.string :representation_id

      t.timestamps
    end
  end
end
