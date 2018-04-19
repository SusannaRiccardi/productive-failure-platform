class AddActivityPatternIdToRepresentation < ActiveRecord::Migration[5.1]
  def change
    add_column :representations, :activity_pattern_id, :string
  end
end
